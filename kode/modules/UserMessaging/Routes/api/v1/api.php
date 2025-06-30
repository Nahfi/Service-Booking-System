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


            #CUSTOM MESSAGES ROUTE
            Route::controller(MessageController::class)->prefix('messages/')->group(function () {

                Route::post('/toggle-reaction/{conversationId}/{messageId}', 'toggleReaction');
                Route::post('/toggle-mute/conversation/{conversationId}', 'toggleMute');
                Route::post('/toggle-block/conversation/{conversationId}', 'toggleBlock');
                Route::delete('/destory/conversation/{conversationId}', 'destoryConversation');

            });

        });

    });

});
