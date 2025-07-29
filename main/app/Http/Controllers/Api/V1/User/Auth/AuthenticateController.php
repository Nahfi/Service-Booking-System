<?php

namespace App\Http\Controllers\Api\V1\User\Auth;

use App\Builders\ApiResponseBuilder;
use App\Enums\Settings\ErrorEventKey;
use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Requests\AuthenticateRequest;
use Modules\User\Http\Resources\UserResource;
use Modules\User\Http\Services\AuthService;

class AuthenticateController extends Controller
{


    public function __construct(protected AuthService $authService){}

    /**
     * Summary of login
     * @param \Modules\User\Http\Requests\AuthenticateRequest $request
     * @return \App\Facades\ApiResponse|\App\Builders\ApiResponseBuilder|\Illuminate\Http\JsonResponse
     */
    public function login(AuthenticateRequest $request): ApiResponse | ApiResponseBuilder | JsonResponse{

        $user = $this->authService->findActiveUser(attributes: ['email' => $request->input('email')]);

        $rememberMe  = $request->input('remember_me');

        try {

            switch (true) {
                case $user && Hash::check($request->input("password"), $user->password):

                    $this->authService->verifyTwoFactorCode($user);

                    $accessToken = $this->authService->getAccessToken(
                                                                        user       : $user,
                                                                        deviceName : $deviceName,
                                                                        rememberMe :  $rememberMe
                                                                     );

                    $this->authService->setLocale($user);


                    return ApiResponse::asSuccess()
                                    ->withData(['access_token' => $accessToken])
                                    ->append( 'user', new UserResource( $user))
                                    ->build();


                default:

                    return ApiResponse::error(
                        data: ['error' => translate('Invalid password!')],
                        code: Response::HTTP_UNAUTHORIZED,
                        appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
                    );
            }

        } catch (\Exception $ex) {
            return ApiResponse::error(
                data: ['error' => $ex->getMessage()],
                code: Response::HTTP_UNAUTHORIZED,
                appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
            );

        }

    }




    /**
     * Summary of logout
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {

        $user = getAuthUser('user:api');
        $user->currentAccessToken()?->delete();
        #FORGET CACHE
        optimize_clear();
        return ApiResponse::asSuccess()
                         ->build();
    }

}
