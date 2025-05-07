<?php

namespace App\Http\Middleware;

use App\Facades\ApiResponse;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as FoundationResponse ;

class ExceptionHandlerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): FoundationResponse
    {

        try {
            return $next($request);
        } catch (\Exception $ex) {
            return ApiResponse::error(
                data    : ['error' => $ex->getMessage()],
                code    : 422
            );
        }


    }
}
