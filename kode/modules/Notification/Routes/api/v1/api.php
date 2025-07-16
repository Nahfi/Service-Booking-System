<?php


use Illuminate\Support\Facades\Route;
use Modules\Notification\Http\Controllers\Api\V1\DatabaseNotificationController;
use Modules\Notification\Http\Controllers\Api\V1\GatewayNotificationController;
use Modules\User\Enums\RateLimit;
use Modules\User\Http\Controllers\Api\V1\ProfileController;
use Modules\User\Http\Controllers\Api\V1\RoleController;

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


Route::group(['middleware' => ['sanitization', 'exception.handler']], function () {

    #NOTIFICATIONS ROUTE
    Route::group(['middleware' => ['auth:sanctum', 'user.api.token']], function () {



        Route::group(['middleware' => ['throttle:' .RateLimit::NOTIFICATIONS->toThrottleString()]], function () {


            #RESOURCE ROUTES
            Route::apiResources(resources: [
                'database-notifications'     => DatabaseNotificationController::class,
                'gateway-notifications'      => GatewayNotificationController::class,
            ]);

            #CUSTOM DB NOTIFICATIONS ROUTE
            Route::controller(DatabaseNotificationController::class)->prefix('database-notifications/')->group(function () {

                Route::post('read-all', 'read');
                Route::patch('read/{?id}', 'read');
                Route::post('bulk', 'bulk');

            });

            #CUSTOM GATEWAY NOTIFICATIONS ROUTE
            Route::controller(GatewayNotificationController::class)->prefix('gateway-notifications/')->group(function () {

                Route::post('bulk', 'bulk');
            });





        });

    });

});
