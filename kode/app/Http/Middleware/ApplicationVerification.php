<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApplicationVerification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $softwareID = $request->header('Q-SOFTWARE-ID',null);
        

        // if($softwareID != 'QHUB') throw new \Exception(translate('Invalid software'),Response::HTTP_UNAUTHORIZED);


        return $next($request);
    }
}
