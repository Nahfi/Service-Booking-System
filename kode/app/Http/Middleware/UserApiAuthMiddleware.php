<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use App\Facades\ApiResponse;
use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use Illuminate\Http\Request;
use App\Enums\Settings\TokenKey;
use Symfony\Component\HttpFoundation\Response;

class UserApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response{

        $user = getAuthUser('user:api');

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
    public function updateLastLoginTime(User $user) : void{
        $currentTime = now();
        if (is_null($user->last_login_time) || $user->last_login_time->diffInMinutes($currentTime) >= 2) {
            $user->last_login_time = $currentTime;
            $user->save();
        }
    }
}
