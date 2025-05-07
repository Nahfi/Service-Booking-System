<?php

namespace App\Http\Controllers\Api\Business\Auth\Password;

use Carbon\Carbon;
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
use App\Enums\Settings\Admin\NotificationTemplateEnum;

class PasswordResetController extends Controller
{
    use Notify, ModelAction;
    public function __construct(protected AuthService $authService) {}

    /**
     * verifyEmail
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        $validator = Validator::make(
            data: $request->all(),
            rules: [
                'email' => 'required|exists:users,email'
            ]
        );

        if ($validator->fails())
            throw new ValidationException(
                validator: $validator,
                response: ApiResponse::error(
                    data: ['errors' => $validator->errors()],
                    code: Response::HTTP_BAD_REQUEST
                )
            );

        $user        = User::whereEmail($request->input('email'))
                                ->first();
        $templateKey = NotificationTemplateEnum::PASSWORD_RESET->value;
        $otp         = $this->saveOTP($user, $templateKey, true);
        $ipInfo      = get_ip_info();

        $this->sendNotification(templateKey: NotificationTemplateEnum::PASSWORD_RESET->value, data: [
            'template_code' => [
                "otp_code"          => $otp->otp,
                "ip"                => $ipInfo['ip'],
                "time"              => Carbon::now(),
                "operating_system"  => $ipInfo['os_platform'],
            ],
            'receiver_model' => $user
        ]);

        return ApiResponse::asSuccess()
            ->withMessage(translate('Check your email password reset code sent successfully'))
            ->append('email', $user->email)
            ->build();
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
            'email'    => ['required', 'exists:users,email'],
            'password' => 'required|confirmed|min:6',
            'code'     => 'required',
        ]);

        if ($validator->fails())
            throw new ValidationException(
                validator: $validator,
                response: ApiResponse::error(
                    data: ['errors' => $validator->errors()],
                    code: Response::HTTP_BAD_REQUEST
                )
            );

        $user = User::with(['otp'])
                        ->whereEmail($request->input('email'))
                        ->firstOrfail();

        if (!$user)
            throw new \Exception(
                translate('Invalid email'),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );

        $otp = $user->otp()
                        ->where('otp', $request->input('code'))
                        ->first();

        if (!$otp)
            throw new \Exception(
                translate('Invalid verification code'),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );

        $user->password = $request->input('password');
        $user->save();
        $otp->delete();

        return ApiResponse::asSuccess()
                                ->withMessage(translate('Password Updated'))
                                ->build();
    }
}
