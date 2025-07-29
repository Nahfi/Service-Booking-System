<?php

use App\Facades\ApiResponse;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Middleware\ExceptionHandlerMiddleware;
use App\Http\Middleware\Sanitization;
use App\Http\Middleware\UserApiAuthMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;


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

                'sanitization'              => Sanitization::class,
                'exception.handler'         => ExceptionHandlerMiddleware::class,
                'cors'                      => CorsMiddleware::class,


            ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (Exception $e, Request $request) {


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
