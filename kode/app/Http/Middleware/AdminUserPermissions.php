<?php

namespace App\Http\Middleware;

use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminUserPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next ,string $permission): Response
    {
        $admin = getAuthUser('admin:api', ['role']);
        
        if( $admin && $admin->role
            && (!check_permission($admin,  $permission))){
                return ApiResponse::error(
                    data: ['error' => translate('Unauthorized Access')],
                    code: Response::HTTP_UNAUTHORIZED,
                    appends: ['event' => SettingKey::UNAUTHORIZED_REQUEST->value]
                );
        }

        return $next($request);
    }
}
