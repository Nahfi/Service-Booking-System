<?php

namespace App\Http\Middleware;

use App\Enums\Common\Status;
use App\Enums\Settings\TokenKey;
use App\Facades\ApiResponse;
use App\Models\Admin\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

    
        $admin = getAuthUser('admin:api', []);


        switch (true) {
            
            case $admin && $admin->status == Status::INACTIVE->value:
                $admin->tokens()->delete();
                return ApiResponse::error(
                    data    : ['error' => translate('Your account has been deactivated by the system admin')],
                    code    : Response::HTTP_UNAUTHORIZED
                );
                
            case $admin && $admin->tokenCan('role:'.TokenKey::ADMIN_AUTH_TOKEN_ABILITIES->value):
                $this->updateLastLoginTime($admin);
                return $next($request);
            default:
    
                return ApiResponse::error(
                    data    : ['error' => translate('Invalid token')],
                    code    : Response::HTTP_UNAUTHORIZED
                );
        }
    }


    /**
     * Summary of updateLastLoginTime
     * @param \App\Models\Admin\Admin $admin
     * @return void
     */
    public function updateLastLoginTime(Admin $admin) : void{
        $currentTime = now();
        if (is_null($admin->last_login_time) || $admin->last_login_time->diffInMinutes($currentTime) >= 2) {
            $admin->last_login_time = $currentTime;
            $admin->save();
        }
    }
}
