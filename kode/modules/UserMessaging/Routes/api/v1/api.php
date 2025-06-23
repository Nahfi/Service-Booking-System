<?php


use Illuminate\Support\Facades\Route;
use Modules\UserMessaging\Enums\RateLimit;
use Modules\UserMessaging\Http\Controllers\Api\V1\MessageController;

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


    Route::group(['middleware' => ['auth:sanctum', 'user.api.token']], function () {

        Route::group(['middleware' => ['throttle:' .RateLimit::MESSAGING->toThrottleString()]], function () {

            #RESOURCE ROUTES
            Route::apiResources(resources: [
                'messages'     => MessageController::class,
            ]);


            #CUSTOM PROFILE ROUTE
            Route::controller(MessageController::class)->prefix('messages/')->group(function () {
                Route::post('mute', 'updateFcmToken');
                Route::post('/mute/conversation/{id}', 'toggleMute');

                // Route::post('update-password', 'passwordUpdate');
                // Route::post('destroy-account', 'destroyAccount');
                // Route::post('toggle-online-status', 'toggleOnlineStatus');
            });

        });

    });

});
