<?php

namespace Modules\SmsMessaging\Http\Middleware\Api\v1;

use Closure;
use App\Facades\ApiResponse;
use App\Enums\Common\Status;
use Illuminate\Http\Request;
use App\Enums\Settings\TokenKey;
use Illuminate\Support\Facades\Cache;
use App\Enums\Settings\ErrorEventKey;
use Laravel\Sanctum\PersonalAccessToken;
use Modules\SmsMessaging\Models\SmsProvider;
use Symfony\Component\HttpFoundation\Response;
use Modules\SmsMessaging\Http\Services\Api\v1\Device\ProviderService;

class SmsProviderDeviceAuthMiddleware
{
    /**
     * handle
     *
     * @param Request $request
     * @param Closure $next
     * 
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        $smsProviderService = new ProviderService();
        $smsProvider = $smsProviderService->getSmsProviderViaToken($token);

        if (!$token 
            || !$smsProvider 
            || !($smsProvider instanceof SmsProvider) 
            || !$token->can('role:' . TokenKey::SMS_PROVIDER_TOKEN_ABILITIES->value)) {

            return ApiResponse::error(
                data: ['error' => translate('Invalid or unauthorized token')],
                code: Response::HTTP_UNAUTHORIZED,
                appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
            );
        }
            
        $deviceId = $request->header('X-Device-Fingerprint');

        if (!$deviceId) {
            return ApiResponse::error(
                data: ['error' => translate('Invalid Device')],
                code: Response::HTTP_BAD_REQUEST,
                appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
            );
        }
         
        $device = $smsProviderService->getSmsProviderDevice($smsProvider);
          
        if (!$device) {
            return ApiResponse::error(
                data: ['error' => translate('Device not found or invalid token')],
                code: Response::HTTP_UNAUTHORIZED,
                appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
            );
        }

        // Check device status
        if ($device->status === Status::INACTIVE->value) {
            return ApiResponse::error(
                data: ['error' => translate('Device is not approved yet')],
                code: Response::HTTP_FORBIDDEN,
                appends: ['event' => ErrorEventKey::UNAUTHORIZED_REQUEST->value]
            );
        }

        $this->updateLastActiveTime($smsProvider, $device);
        $this->updateDeviceSession($smsProvider, $device, $request->bearerToken());

        return $next($request);
    }

    /**
     * updateLastActiveTime
     *
     * @param SmsProvider $smsProvider
     * @param mixed $device
     * 
     * @return void
     */
    private function updateLastActiveTime(SmsProvider $smsProvider, $device): void
    {
        $currentTime = now();
        if (is_null($smsProvider->last_active_time) || $smsProvider->last_active_time->diffInMinutes($currentTime) >= 2) {
            $smsProvider->last_active_time = $currentTime;
            $smsProvider->save();
        }
        if (is_null($device->last_active_at) || $device->last_active_at->diffInMinutes($currentTime) >= 2) {
            $device->last_active_at = $currentTime;
            $device->save();
        }
    }

    /**
     * updateDeviceSession
     *
     * @param SmsProvider $smsProvider
     * @param mixed $device
     * @param string|null $token
     * 
     * @return void
     */
    private function updateDeviceSession(SmsProvider $smsProvider, $device, ?string $token): void
    {
        if (!$token) return;
        
        $hashedToken = hash('sha256', explode('|', $token)[1] ?? '');
        $cacheKey = "device-session-last-update-{$smsProvider->id}-{$device->id}-{$hashedToken}";

        if (!Cache::has($cacheKey)) {
            $device->update(['last_active_at' => now()]);
            Cache::put($cacheKey, now()->timestamp, now()->addMinutes(3));
        }
    }
}
