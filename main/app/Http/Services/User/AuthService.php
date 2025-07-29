<?php


namespace App\Http\Services\User;

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
      * Summary of getAccessToken
      * @param \App\Models\User $user
      * @param string $deviceName
      * @param bool|null $rememberMe
      * @return string
      */
     public function getAccessToken(User $user, string $deviceName ,  bool | null $rememberMe = false): string
     {

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
          ]);

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

          $language =  Settings::default()
                                        ->language()
                                        ->first();


          if($language){
               $value  = json_decode($language->value);
               $locale = $value?->code;
          }

          app()->setLocale( @$locale ?? 'en');

     }



}
