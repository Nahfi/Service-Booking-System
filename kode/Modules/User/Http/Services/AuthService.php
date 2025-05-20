<?php


namespace Modules\User\Http\Services;

use Exception;
use App\Models\User;
use Illuminate\Http\Response;
use App\Enums\Settings\TokenKey;
use Illuminate\Http\JsonResponse;
use Modules\Settings\Models\Settings;
use PragmaRX\Google2FA\Google2FA;

class AuthService 
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
      * Summary of verifyTwoFactorCode
      * @param \App\Models\User $user
      * @return void
      */
     public function verifyTwoFactorCode(User $user): void{

          if ($user->two_factor_enabled) {
               
               if (!request()->has('code')) 
                    throw new Exception(translate("2FA code required"), Response::HTTP_NOT_FOUND);
               
               $google2fa = new Google2FA();

               if (!$google2fa->verifyKey($user->google2fa_secret, request()->input('code')))

                    throw new Exception(translate("Invalid 2FA code"), Response::HTTP_NOT_FOUND);
          }
     }
      
     
     /**
      * Summary of getAccessToken
      * @param \App\Models\User $user
      * @param string $deviceName
      * @param bool|null $rememberMe
      * @return string
      */
     public function getAccessToken(User $user, string $deviceName ,  bool | null $rememberMe = false): string
     {
          $existingToken = $user->tokens()->where('name', $deviceName)->first();

          if ($existingToken && (!$existingToken->expires_at && $existingToken->expires_at->isFuture())) {
               return $existingToken->plainTextToken;
          }

          $existingToken?->delete();
          
          return  $user->createToken(
                                        name: $deviceName,
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
     * @param \App\Models\User $user
     * @return void
     */
     function setLocale(User $user): void{

          $locale = 'en';

          $parentUserId =   $user->parent_id ?: $user->id;;

          $language =  Settings::where('user_id',$parentUserId)
                                        ->default()
                                        ->language()
                                        ->first();

                                   
          if($language){
               $value  = json_decode($language->value);
               $locale = $value?->code;
          }

          app()->setLocale( @$locale ?? 'en');

     }


     /**
      * Summary of createSession
      * @param \App\Models\User $user
      * @param string $token
      * @return void
      */
     public  function createSession(User $user , string $token): void{

          $user->sessions()->create([
               'ip_address' => request()->ip(),
               'user_agent' => request()->userAgent(),
               'device_name' => request()->input('device_name'),
               'token' => hash('sha256', explode('|', $token)[1]), 
               'last_active_at' => now(),
          ]);

     }
}
