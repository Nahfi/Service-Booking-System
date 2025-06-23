<?php


use Illuminate\Support\Facades\Route;
use Modules\Settings\Enums\RateLimit;
use Modules\Settings\Http\Controllers\Api\V1\EmailGatewayController;
use Modules\Settings\Http\Controllers\Api\V1\LanguageController;
use Modules\Settings\Http\Controllers\Api\V1\NotificationTemplateController;
use Modules\Settings\Http\Controllers\Api\V1\SettingsController;


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
                'settings'                 => SettingsController::class,
                'languages'                => LanguageController::class,
                'email-gateways'           => EmailGatewayController::class,
                'notification-templates'   => NotificationTemplateController::class,
            ]);


            Route::post('/email-gateways/test',[EmailGatewayController::class ,'testGateway']);
            Route::post('/email-gateways/make-default',[EmailGatewayController::class ,'makeDefault']);

            #CUSTOM LANGUAGE ROUTE
            Route::controller(LanguageController::class)->prefix('languages/')->group(function () {

                Route::post('update-status', 'updateStatus');
                Route::post('make-default', 'makeDefault');
                Route::get('get-translation/{code}', 'getTranslation');
                Route::post('translate', 'translate');
                Route::post('toggle-direction', 'toggleDirection');

            });


        });

});
