<?php

use App\Facades\ApiResponse;
use App\Http\Middleware\ApplicationVerification;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\ExceptionHandlerMiddleware;
use App\Http\Middleware\Sanitization;
use App\Http\Middleware\UserApiAuthMiddleware;
use App\Http\Middleware\UserPermissions;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Foundation\ViteManifestNotFoundException;

use Symfony\Component\HttpFoundation\Response;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: null,

        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
      
            $middleware->alias([
    
                'user.api.token'            => UserApiAuthMiddleware::class,
                'user.permission.check'     => UserPermissions::class,
                'sanitization'              => Sanitization::class,
                'exception.handler'         => ExceptionHandlerMiddleware::class,
                'cors'                      => CorsMiddleware::class,
                'app.verification'          => ApplicationVerification::class

            ]);
        
    })
    ->withExceptions(function (Exceptions $exceptions) {
   
        $exceptions->render(function (Exception $e, Request $request) {

             if (
                $e instanceof \Illuminate\View\ViewException  &&
                str_contains($e->getMessage(), 'Vite manifest not found')
            ) {
                return response()->json('NPM IS NOT RUNNING',500);
            }
        
   
            if ($request->is('api/*')) {
                

                if ($e instanceof \Illuminate\Validation\ValidationException)    return null;



                if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException)   {

                    return ApiResponse::error(
                        data: ['error' => translate('No result found')],
                        code: $e->getCode() == 0 || is_string($e->getCode()) ? Response::HTTP_NOT_FOUND : $e->getCode()  
                    );
                }

    
                return ApiResponse::error(
                    data: ['error' => translate(@$e->getMessage() ?? translate('An unexpected error occurred'))],
                    code: $e->getCode() == 0 || is_string($e->getCode()) ? Response::HTTP_INTERNAL_SERVER_ERROR : $e->getCode()  
                );
            }
        });
        
    })->create();
