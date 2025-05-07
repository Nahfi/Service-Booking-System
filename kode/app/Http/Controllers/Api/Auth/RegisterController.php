<?php

namespace App\Http\Controllers\Api\Business\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use App\Traits\Common\Notify;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Services\Business\Auth\AuthService;
use App\Http\Requests\Business\Auth\RegisterRequest;

class RegisterController extends Controller
{
    use ModelAction, Notify;
    
    public function __construct(protected AuthService $authService) {}

    /**
     * store
     *
     * @param RegisterRequest $request
     * 
     * @return JsonResponse
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        return $this->authService->register($request);
    }


    /**
     * verify
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function verify(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'exists:users,email'],
            'code'  => 'required',
        ]);

        if ($validator->fails())
                        throw new ValidationException(
                            validator: $validator,
                            response: ApiResponse::error(
                                data: ['errors' => $validator->errors()],
                                code: Response::HTTP_UNPROCESSABLE_ENTITY
                            )
                        );

        return $this->authService->verifyRegistration($request);
    }

    /**
     * resendCode
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function resendCode(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'exists:users,email'],
        ]);

        if ($validator->fails())
            throw new ValidationException(
                validator: $validator,
                response: ApiResponse::error(
                    data: ['errors' => $validator->errors()],
                    code: Response::HTTP_UNPROCESSABLE_ENTITY
                )
            );

        $user = User::with(['otp'])
                                ->whereEmail($request->input('email'))
                                ->firstOrfail();

        return $this->authService->sendEmailVerificationCode($user);
    }
}
