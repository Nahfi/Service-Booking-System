<?php

namespace Modules\User\Http\Controllers\Api\V1;

use App\Enums\Settings\NotificationTemplateEnum;
use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Services\AuthService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{

    public function __construct(protected AuthService $authService){}


    /**
     * Summary of verifyEmail
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return JsonResponse
     */
    public function verifyEmail(Request $request): JsonResponse{


        $validator = Validator::make(
            data: $request->all(),
            rules: ['email'         => 'required|exists:users,email']
        );

        if ($validator->fails())
            throw new ValidationException(
                            validator: $validator,
                            response: ApiResponse::error(
                                data: ['errors' => $validator->errors()],
                                code: Response::HTTP_BAD_REQUEST
                            )
        );

        $email = $request->input('email');

        return $this->authService->sendEmailVerificationCode($email , NotificationTemplateEnum::PASSWORD_RESET->value);
    }




    /**
     * passwordUpdate
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function passwordUpdate(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'email'                      => ['required', 'exists:users,email'],
            'password'                   => ['required','confirmed','min:6'],
            'verification_code'          => 'required',
        ]);

        if ($validator->fails())
            throw new ValidationException(
                validator: $validator,
                response: ApiResponse::error(
                    data: ['errors' => $validator->errors()],
                    code: Response::HTTP_BAD_REQUEST
                )
            );


        return $this->authService->verifyAndUpdatePassword( $request);
    }

      

    
}
