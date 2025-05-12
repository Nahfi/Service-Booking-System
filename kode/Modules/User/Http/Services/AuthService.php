<?php


namespace Modules\User\Http\Services;

use Exception;
use App\Models\User;
use Illuminate\Http\Response;
use App\Enums\Settings\TokenKey;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
class AuthService extends Controller
{

    /**
     * Summary of findActiveUser
     * @param array $attributes
     * @throws \Exception
     */
    public function findActiveUser(array $attributes): ?User{

          $user = User::with(['file', 'role'])
                            ->active()
                            ->where($attributes)
                            ->first();
      
          if (!$user) 
              throw new Exception(translate("Invalid User"), Response::HTTP_NOT_FOUND);
        

          return $user;
     }
      

     
     
     /**
      * Summary of getAccessToken
      * @param \App\Models\User $user
      * @param bool|null $rememberMe
      * @return string
      */
     public function getAccessToken(User $user, bool | null $rememberMe = false): string
     {
          return  $user->createToken(
                              name: TokenKey::USER_AUTH_TOKEN->value,
                              abilities: ['role:' . TokenKey::USER_AUTH_TOKEN_ABILITIES->value],
                              expiresAt: $rememberMe ? now()->addYears(10) : now()->addDays()
                         )->plainTextToken;
     }


  

     
     
     /**
      * sendEmailVerificationCode
      *
      * @param User $user
      * 
      * @return JsonResponse
      */
     public function sendEmailVerificationCode(User $user): JsonResponse
     {
        //   $templateKey = NotificationTemplateEnum::REGISTRATION_VERIFY->value;

        //   $otp         = $this->saveOTP($user, $templateKey, true);
        //   $ipInfo      = get_ip_info();

        //   $this->sendNotification(templateKey: NotificationTemplateEnum::REGISTRATION_VERIFY->value, data: [
        //        'template_code' => [
        //             "otp_code"          => $otp->otp,
        //             "ip"                => $ipInfo['ip'],
        //             "time"              => Carbon::now(),
        //             "operating_system"  => $ipInfo['os_platform'],
        //        ],
        //        'receiver_model' => $user
        //   ]);

        //   return ApiResponse::asSuccess()
        //                            ->withMessage(translate('Check your email an email verification code sent successfully'))
        //                            ->setBusiness($user)
        //                            ->withData($user , UserResource::class)
        //                            ->append('email', $user->email)
        //                            ->append('token',$this->getAccessToken($user))
        //                            ->append('response_identification', NotificationKey::EMAIL_UNVERIFIED->value)
        //                            ->build();
     }

   
     /**
      * Summary of setLocale
      * @param string $code
      * @return void
      */
     public function setLocale(string $code  = 'en'): void{           
          app()->setLocale($code);
     }
}
