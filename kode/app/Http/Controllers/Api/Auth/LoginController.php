<?php

namespace App\Http\Controllers\Api\Business\Auth;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use App\Http\Controllers\Controller;
use App\Builders\ApiResponseBuilder;
use App\Enums\Settings\SettingKey;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Services\Business\Auth\AuthService;
use App\Http\Requests\Business\Auth\LoginRequest;
use App\Models\User;
use App\Models\UserBusinessSetting;
use Exception;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoginController extends Controller
{
    use ModelAction;

    public function __construct(protected AuthService $authService) {}

    /**
     * login
     *
     * @param LoginRequest $request
     * 
     * @return ApiResponse | ApiResponseBuilder | JsonResponse
     */
    public function login(LoginRequest $request): ApiResponse | ApiResponseBuilder | JsonResponse
    {


        $user = $this->authService->getActiveBusiness(attributes: ['email' => $request->input('email')]);


        if($user->parent_id){

            $businessId = $request->input("business_id");

            if(!$businessId){

                return ApiResponse::error(
                    data: ['error' => translate('You need business ID for log in')],
                    code: Response::HTTP_UNAUTHORIZED,
                    appends: ['event' => SettingKey::BUSINESS_ID_REQUIRED->value]
                );
            
            }


            $businessSettings = UserBusinessSetting::whereHas('business')
                            ->with([
                                'business' => function(BelongsTo $query): BelongsTo{
                                return $query->with('runningSubscription')->active();
                                
                            }])->where('business_id', $businessId)->first();
                        

            

           
           if(!$businessSettings){
                    return ApiResponse::error(
                        data: ['error' => translate('Invalid business Id')],
                        code: Response::HTTP_UNAUTHORIZED,
                        appends: ['event' => SettingKey::BUSINESS_ID_REQUIRED->value]
                    );
           }


           $business = @$businessSettings?->business;


           $user = User::with(['business','role'])
                            ->where('parent_id', $business->id)
                            ->where( ['email' => $request->input('email')])
                            ->active()
                            ->whereHas('role', function($query) {
                                    $query->active();
                            })
                            ->firstOrFail();


            if ($user?->role && $user?->role?->name == SettingKey::IS_EMPLOYEE->value) 
               throw new Exception(translate("User Role is not authorized to log into this panel"), Response::HTTP_FORBIDDEN);

                                

        }
        // if(!$user->is_verified)
        //     throw new \Exception(
        //         translate('Unathorized Request, business is not verified yet.'),
        //         Response::HTTP_UNAUTHORIZED);   

        try {
            switch (true) {

                case $user && Hash::check($request->input("password"), $user->password):

                    $this->generateActivity($user, [
                        'ip_info' => get_ip_info(),
                        'message' => translate('logged in to the system'),
                    ]);

                    $user = $user->load([
                                            'file',
                                            'affiliateAdmin',
                                            'businessSetting',
                                            'businessSetting.language'
                                        ]);

                    $language = $user?->businessSetting?->language;
                    
                    $value  = $language 
                                ? json_decode($language->value) 
                                :null;


                    $this->authService->setLocale(  $value ?  $value->code : 'en');


                    return ApiResponse::asSuccess()
                             
                                            ->withData(
                                                [
                                                    'access_token' => $this->authService->getAccessToken(
                                                        user: $user,
                                                        remember_me: $request->input('remember_me')
                                                    )
                                                ]
                                            )
                                            ->append( 'user', new UserResource( $user, getBusiness($user)))
                                            ->build();

                default:

                    $this->generateActivity($user, [
                        'ip_info' => get_ip_info(),
                        'message' => translate('Failed Login Attempted'),
                    ]);
                    return ApiResponse::error(
                        data: ['error' => translate('Invalid password !!')],
                        code: Response::HTTP_UNAUTHORIZED,
                        // appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
                    );
            }
        } catch (\Exception $ex) {

            $this->generateActivity($user, [
                'ip_info' => get_ip_info(),
                'message' => translate('Failed Login Attempted'),
            ]);

            if ($user) $user->tokens()->delete();

            return ApiResponse::error(
                data: ['error' => $ex->getMessage()],
                code: Response::HTTP_UNAUTHORIZED,
                appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
            );
        }
    }

    /**
     * logout
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {

        $user = getAuthUser('user:api');
        $user->tokens()->delete();
        return ApiResponse::asSuccess()
                                ->build();
    }
}
