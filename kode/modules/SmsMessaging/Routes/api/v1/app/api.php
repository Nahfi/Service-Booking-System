<?php


use Illuminate\Support\Facades\Route;
use Modules\UserMessaging\Enums\RateLimit;
use Modules\SmsMessaging\Http\Controllers\Api\v1\App\GatewayController;
use Modules\SmsMessaging\Http\Controllers\Api\v1\App\ProviderController;
use Modules\SmsMessaging\Http\Middleware\Api\v1\SmsProviderDeviceAuthMiddleware;

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

     Route::group(['middleware' => [SmsProviderDeviceAuthMiddleware::class]], function () {
          
          Route::group(['middleware' => ['throttle:' .RateLimit::MESSAGING->toThrottleString()]], function () {
               
               Route::prefix("app")
                         ->name("app.")
                         ->group(function() {
                    
                    #RESOURCE ROUTES
                    Route::apiResources(resources: [
                         'sms-gateways'       => GatewayController::class,
                    ], options: [
                         'sms-gateways'       => [
                              'parameters'   => 'uid',
                              'except'       => ['destroy']
                         ]
                    ]);

                    #CUSTOM SMS Provider ROUTE
                    Route::prefix("sms-providers")
                              ->name('sms-providers.')
                              ->controller(ProviderController::class)
                              ->group(function() {

                         Route::post('connect', 'connect')
                                   ->name('connect')
                                   ->withoutMiddleware([SmsProviderDeviceAuthMiddleware::class]);

                         Route::get('check-connection', 'checkConnection')->name('check.connection');
                    });         
                    Route::prefix("sms-gateways")
                              ->name('sms-gateways.')
                              ->controller(GatewayController::class)
                              ->group(function() {

                         Route::post('update-status', 'updateStatus')->name('update.status');
                    });         
               });
          });
     });
});
