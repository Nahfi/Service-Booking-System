<?php

namespace Modules\User\Http\Controllers\Api\v1;

use App\Builders\ApiResponseBuilder;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Requests\AuthenticateRequest;
use Modules\User\Http\Services\AuthService;

class AuthenticateController extends Controller
{
   



    public function __construct(protected AuthService $authService) {}

   


    public function login(AuthenticateRequest $request): ApiResponse | ApiResponseBuilder | JsonResponse{

        $user = $this->authService->findActiveUser(attributes: ['email' => $request->input('email')]);

         @dd($user );



        // try {
        //     switch (true) {
        //         case $user && Hash::check($request->input("password"), $user->password):
        //             $data = [];
                    
        //             $this->generateActivity($user, [
        //                 'ip_info' => get_ip_info(),
        //                 'message' => translate('logged in to the system'),
        //             ], $business);
        //             $data['access_token'] = $this->authService->getAccessToken(
        //                 user: $user,
        //                 remember_me: true
        //             );
                    
        //             $reponse = ApiResponse::asSuccess()
        //                 ->withData($data)
        //                 ->append( 'user', new UserResource( $user, $business));
                        
        //             if(business_site_settings($user?->business, SettingKey::KYC_VERIFICATION->value, Status::INACTIVE->value) == Status::ACTIVE->value
        //                 && !$user->is_kyc_verified) $reponse->append('event', SettingKey::UNVERFIED_KYC->value);
        //             return $reponse->build();
                        

        //         default:

        //             $this->generateActivity($user, [
        //                 'ip_info' => get_ip_info(),
        //                 'message' => translate('Failed Login Attempted'),
        //             ],$business);
        //             return ApiResponse::error(
        //                 data: ['error' => translate('Credentail Mismatch !!')],
        //                 code: Response::HTTP_UNAUTHORIZED,
        //                 appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
        //             );
        //     }
        // } catch (\Exception $ex) {

        //     $this->generateActivity($user, [
        //         'ip_info' => get_ip_info(),
        //         'message' => translate('Failed Login Attempted'),
        //     ], $business);

        //     if ($user) $user->tokens()->delete();

        //     return ApiResponse::error(
        //         data: ['error' => $ex->getMessage()],
        //         code: Response::HTTP_UNAUTHORIZED,
        //         appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
        //     );
        // }
    }

    


    /**
     * Summary of logout
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {

        $user = getAuthUser('user:api');
        $user->fcm_token = null;
        $user->save();
        $user->tokens()->delete();
        return ApiResponse::asSuccess()
                         ->build();
    }
















}
