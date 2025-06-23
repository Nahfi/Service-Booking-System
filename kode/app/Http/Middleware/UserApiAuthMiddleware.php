<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Facades\ApiResponse;
use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use Illuminate\Http\Request;
use App\Enums\Settings\TokenKey;
use Illuminate\Support\Facades\Cache;
use Modules\User\Models\UserSession;
use Symfony\Component\HttpFoundation\Response;

class UserApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{

        $user = getAuthUser('user_api');

        switch (true) {

            case $user && $user->status == Status::INACTIVE->value:
                $user->tokens()->delete();
                return ApiResponse::error(
                    data: ['error' => translate('This Business has been deactivated by the system admin')],
                    code: Response::HTTP_UNAUTHORIZED,
                    appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
                );

                case $user && $user->tokenCan('role:'.TokenKey::USER_AUTH_TOKEN_ABILITIES->value):

                    $this->updateLastLoginTime($user);
                   +$this->updateUserSesssion($user);
                    $this->loadUserContext($user);


                return $next($request);
            default:

                return ApiResponse::error(
                    data: ['error' => translate('Invalid token')],
                    code: Response::HTTP_UNAUTHORIZED,
                    appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
                );

        }
    }


    /**
     * Summary of updateLastLoginTime
     * @param User $user
     * @return void
     */
    private function updateLastLoginTime(User $user) : void{
        $currentTime = now();
        if (is_null($user->last_login_time) || $user->last_login_time->diffInMinutes($currentTime) >= 2) {
            $user->last_login_time = $currentTime;
            $user->save();
        }
    }



    /**
     * Summary of updateUserSesssion
     * @param \App\Models\User $user
     * @return void
     */
    private function updateUserSesssion(User $user): void{

        $token = request()->bearerToken();
        $hashedToken = hash('sha256', explode('|', $token)[1] ?? '');

        $cacheKey = "session-last-update-{$user->id}-{$hashedToken}";

        if (!Cache::has($cacheKey)){

            UserSession::where('user_id', $user->id)
                            ->where('token', $hashedToken)
                            ->update(['last_active_at' => now()]);

            Cache::put($cacheKey, now()->timestamp, now()->addMinutes(3));
        }
    }



    /**
     * Summary of loadUserContext
     * @param \App\Models\User $user
     * @return void
     */
    private function loadUserContext(User $user): void{


        $targetId       = $user->parent_id ?: $user->id;
        $cacheKeyPrefix = "user:{$user->id}";
        $ttl = now()->addDays(2);

        $parent = Cache::remember("{$cacheKeyPrefix}:parent:{$targetId}", $ttl, function () use ($user) {
            $user->loadMissing(relations: $user->parent_id ? 'parent' : []);
            return $user->parent_id ? $user->parent : $user;
        });

        $settings = Cache::remember("{$cacheKeyPrefix}:settings:{$targetId}", $ttl, function () use ($parent) {
            $parent->loadMissing('settings');
            return $parent->settings;
        });

        app()->singleton('user.parent', fn () => $parent);
        app()->singleton('user.settings', fn () => $settings);

    }
}
