<?php

namespace Modules\SmsMessaging\Http\Services\Api\v1\Device;

use Exception;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use App\Enums\Settings\TokenKey;
use Illuminate\Http\JsonResponse;
use App\Enums\SmsMessage\TypeEnum;
use App\Traits\Common\ModelAction;
use Laravel\Sanctum\PersonalAccessToken;
use Modules\SmsMessaging\Models\SmsProvider;
use Modules\SmsMessaging\Http\Resources\Api\v1\SmsProviderResource;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderDeviceRequest;
use Modules\SmsMessaging\Models\SmsProviderDevice;

class ProviderService
{
     use ModelAction;
     
     /**
      * connectWithProvider
      *
      * @param SmsProviderDeviceRequest $request
      * 
      * @return JsonResponse
      */
     public function connectWithProvider(SmsProviderDeviceRequest $request): JsonResponse {

          $smsProvider = SmsProvider::where("uid", $request->input("sms_provider_uid"))
                                        ->active()
                                        ->first();
          if(!$smsProvider || ($smsProvider && $smsProvider->type != TypeEnum::ANDROID->value))
               throw new Exception(translate('Invalid SMS Provider'), Response::HTTP_NOT_FOUND);
          
          $accessToken = $this->getAccessToken(
                              smsProvider    : $smsProvider,
                              rememberMe     : $request->input('remember_me')
                         );

          $smsProvider->devices()->create([
               'ip_address'        => request()->ip(),
               'user_agent'        => request()->userAgent(),
               'fingerprint'       => request()->input('fingerprint'),
               'device_id'         => request()->input('device_id'),
               'android_version'   => request()->input('android_version'),
               'meta_data'         => request()->input('meta_data') ?? null,
               'token'             => hash('sha256', explode('|', $accessToken)[1]),
               'last_active_at'    => now(),
          ]);

          return ApiResponse::asSuccess()
                                    ->withData(['access_token' => $accessToken])
                                    ->append( 'sms_provider', new SmsProviderResource( $smsProvider))
                                    ->withMessage(translate("Please wait for your device approval"))
                                    ->build();
     }

     ## =========================== ##
     ## Additional Helper Functions ##
     ## =========================== ##

     /**
      * getAccessToken
      *
      * @param SmsProvider $user
      * @param bool|null $rememberMe
      * 
      * @return string
      */
     public function getAccessToken(SmsProvider $smsProvider, bool|null $rememberMe = false): string
     {
          $existingToken = $smsProvider->tokens()->where('name', $smsProvider->uid)->first();

          if ($existingToken && (!$existingToken->expires_at && $existingToken->expires_at->isFuture())) 
               return $existingToken->plainTextToken;
          
          $existingToken?->delete();

          return $smsProvider->createToken(
               name: $smsProvider->uid,
               abilities: ['role:' . TokenKey::SMS_PROVIDER_TOKEN_ABILITIES->value],
               expiresAt: $rememberMe ? now()->addYears(10) : now()->addDays()
          )->plainTextToken;
     }

     /**
      * getSmsProviderViaToken
      *
      * @param PersonalAccessToken|null $token
      * 
      * @return SmsProvider
      */
     public function getSmsProviderViaToken(PersonalAccessToken|null $token = null) :SmsProvider|null {

          if(!$token) $token = PersonalAccessToken::findToken(request()->bearerToken());
          
          $smsProvider = null;
          if ($token) {
               $smsProvider = $token->tokenable_type::withoutEvents(function() use ($token) {
                    return $token->tokenable_type::withoutGlobalScopes()
                         ->find($token->tokenable_id);
               });
          }
          return $smsProvider;
     }

     /**
      * getSmsProviderDevice
      *
      * @return SmsProviderDevice
      */
     public function getSmsProviderDevice(SmsProvider $smsProvider) :SmsProviderDevice|null {

          return $smsProvider->devices()
                                   ->where('fingerprint', request()->header('X-Device-Fingerprint'))
                                   ->where('token', hash('sha256', explode('|', request()->bearerToken())[1] ?? ''))
                                   ->first();
     }
}