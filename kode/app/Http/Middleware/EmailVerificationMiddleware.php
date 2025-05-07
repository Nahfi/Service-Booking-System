<?php

namespace App\Http\Middleware;

use App\Enums\Common\Status;
use App\Enums\Settings\NotificationKey;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Http\Services\Admin\Auth\AuthService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EmailVerificationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        $admin = getAuthUser('admin:api', []);

        if($admin->is_affiliate_user 
            && site_settings(key: SettingKey::EMAIL_VERIFICATION->value) 
                    == Status::ACTIVE->value
            && !$admin->email_verified_at){

                return ApiResponse::error(
                    data    : ['error' => translate('Please verify your email')],
                    code: Response::HTTP_UNAUTHORIZED,
                    appends: ['event' => NotificationKey::EMAIL_UNVERIFIED->value]
                );
                  

        }
        
        return $next($request);
    }
}
