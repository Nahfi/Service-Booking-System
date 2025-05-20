<?php


use Illuminate\Support\Facades\Route;
use Modules\Settings\Http\Controllers\Api\V1\LanguageController;
use Modules\Settings\Http\Controllers\Api\V1\SettingsController;
use Modules\User\Enums\RateLimit;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




    Route::group(['middleware' => ['auth:sanctum', 'user.api.token','sanitization', 'exception.handler']], function () {

        Route::group(['middleware' => ['throttle:' .RateLimit::SETTINGS->toThrottleString()]], function () {

            Route::apiResources(resources: [
                'settings'    => SettingsController::class,
                'languages'   => LanguageController::class,
            ]);

            #CUSTOM LANGUAGE ROUTE
            Route::controller(LanguageController::class)->prefix('languages/')->group(function () {

                Route::post('update-status', 'updateStatus');
                Route::post('make-default', 'makeDefault');
                Route::get('get-translation/{code}', 'getTranslation');
                Route::post('translate', 'translate');

            });


            Route::apiResource('notification-templates', SettingsController::class);



        });

});