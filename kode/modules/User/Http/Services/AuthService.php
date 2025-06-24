<?php


namespace Modules\User\Http\Services;

use App\Traits\Common\ModelAction;
use Exception;
use App\Models\User;
use Illuminate\Http\Response;
use App\Enums\Settings\TokenKey;
use App\Facades\ApiResponse;
use App\Traits\Common\Notify;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Settings\Models\Settings;
use PragmaRX\Google2FA\Google2FA;

class AuthService
{

     use ModelAction , Notify;

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
              throw new Exception(translate("User not found"), Response::HTTP_NOT_FOUND);

          return $user;
     }



     /**
      * Summary of verifyTwoFactorCode
      * @param \App\Models\User $user
      * @return void
      */
     public function verifyTwoFactorCode(User $user): void{

          if($user->two_factor_enabled) {

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
      * Summary of sendEmailVerificationCode
      * @param string $email
      * @param string $templateKey
      * @return JsonResponse
      */
     public function sendEmailVerificationCode(string $email ,  string $templateKey): JsonResponse{

          $user    = $this->findActiveUser(['email' => $email]);

          $this->verifyTwoFactorCode($user);

          $parentUser =     !$user->parent_id
                                ? $user
                                : $this->findActiveUser(['parent_id' => $user->id]);

          $otp         = $this->saveOTP($user, $templateKey, true);

          $ipInfo      = getIpInfo();

          $this->sendNotification(templateKey:$templateKey, data: [
               'template_code' => [
                    "otp_code"          => $otp->otp,
                    "ip"                => $ipInfo['ip'],
                    "time"              => Carbon::now(),
                    "operating_system"  => $ipInfo['os'],
               ],
               'receiver_model' => $user
          ] , parentUser: $parentUser);

          return ApiResponse::asSuccess()
                                   ->withMessage(translate('Check your email an email verification code sent successfully'))
                                   ->build();
     }


     /**
      * Summary of verifyAndUpdatePassword
      * @param \Illuminate\Http\Request $request
      * @throws \Exception
      * @return JsonResponse
      */
     public function verifyAndUpdatePassword(Request $request): JsonResponse{


        $user    = $this->findActiveUser(['email' => $request->input('email')]);

        $password = $request->input('password');

        $otp = $user->otp()
                         ->where('otp', $request->input('verification_code'))
                         ->first();

        if (!$otp)
            throw new \Exception(
                translate('Invalid verification code'),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );

        $user->password         = $password;
        $user->visible_password = $password;
        $user->save();

        $otp->delete();

        return ApiResponse::asSuccess()
            ->withMessage(translate('Password Updated'))
            ->build();
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
