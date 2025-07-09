<?php


use Illuminate\Support\Facades\Route;
use Modules\UserMessaging\Enums\RateLimit;
use Modules\SmsMessaging\Http\Controllers\Api\v1\SmsGatewayController;
use Modules\SmsMessaging\Http\Controllers\Api\v1\SmsProviderController;
use Modules\SmsMessaging\Http\Controllers\Api\v1\SmsProviderDeviceController;

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
                    'sms-providers'     => SmsProviderController::class,
                    'sms-gateways'      => SmsGatewayController::class,
               ], options: [
                    'sms-providers'     => [
                         'parameters'   => 'uid',
                         'except'       => ['store', 'update']
                    ],
                    'sms-gateways' => ['parameters' => 'uid'],
               ]);

               #CUSTOM SMS Provider ROUTE
               Route::prefix("sms-providers")
                         ->name("sms-providers.")
                         ->group(function() {

                    Route::controller(SmsProviderController::class)
                              ->group(function() {

                         Route::post('store-api', 'storeApi')->name('store-api');
                         Route::patch('update-api/{uid?}', 'updateApi')->name('update-api');
                         Route::post('store-android', 'storeAndroid')->name('store-android');
                         Route::patch('update-android/{uid?}', 'updateAndroid')->name('update-android');

                         Route::post('bulk', 'bulk')->name('bulk');
                         Route::post('update-status', 'updateStatus')->name('update.status');
                         Route::get("restore/{uid?}", 'restore')->name('restore');
                    });
                    
                    // Route::apiResources(resources: [
                    //      'devices' => SmsProviderDeviceController::class,
                    // ], options: [
                    //      'devices' => [
                    //           'parameters'   => 'uid',
                    //           'except'       => ['store', 'update']
                    //      ],
                    // ]);

                    Route::prefix("devices")
                              ->name("devices.")
                              ->controller(SmsProviderDeviceController::class)
                              ->group(function() {

                         Route::get("/index", 'index')->name('index');
                         Route::get("/show/{uid?}", 'show')->name('index');
                         Route::delete("{uid?}", 'destroy')->name('destroy');
                         Route::post('bulk', 'bulk')->name('bulk');
                         Route::post('update-status', 'updateStatus')->name('update.status');
                         Route::get("restore/{uid?}", 'restore')->name('restore');
                    });
               });

               Route::prefix("sms-gateways")
                         ->name('sms-gateways.')
                         ->controller(SmsGatewayController::class)
                         ->group(function() {

                    Route::post('bulk', 'bulk')->name('bulk');
                    Route::post('update-status', 'updateStatus')->name('update.status');
                    Route::get("restore/{uid?}", 'restore')->name('restore');
               });           
          });
     });
});
