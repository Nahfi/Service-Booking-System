<?php


use Illuminate\Support\Facades\Route;
use Modules\UserMessaging\Enums\RateLimit;
use Modules\Contact\Http\Controllers\Api\V1\ContactController;
use Modules\Contact\Http\Controllers\Api\V1\ContactGroupController;

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
                    'contacts'          => ContactController::class,
                    'contact-groups'    => ContactGroupController::class,
               ], options: [
                    'contacts'          => ['parameters' => 'uid'],
                    'contact-groups'    => ['parameters' => 'uid'],
               ]);
          });

     });

});
