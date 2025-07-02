<?php


use Illuminate\Support\Facades\Route;
use Modules\UserMessaging\Enums\RateLimit;
use Modules\Contact\Http\Controllers\Api\V1\ContactController;
use Modules\Contact\Http\Controllers\Api\V1\ContactGroupController;
use Modules\Contact\Http\Controllers\Api\V1\ContactImportController;

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
                    'contact-imports'   => ContactImportController::class,
               ], options: [
                    'contacts'          => ['parameters' => 'uid'],
                    'contact-groups'    => ['parameters' => 'uid'],
               ]);

               #CUSTOM CONTACT ROUTES
               Route::prefix('contacts')
                         ->controller(ContactController::class)
                         ->name("contacts.")
                         ->group(function () {

                    Route::post('update-status', 'updateStatus')->name('update.status');
                    Route::post('update-favorites', 'updateFavorites')->name('update.favorites');
                    Route::post('update-group-attachments', 'updateContactGroupAttachments')->name('update.group.attachments');
                    Route::post('bulk', 'bulk')->name('bulk');
                    Route::get("restore/{uid?}", 'restore')->name('restore');
               });

               #CUSTOM CONTACT GROUP ROUTES
               Route::prefix('contact-groups')
                         ->controller(ContactGroupController::class)
                         ->name("contacts.")
                         ->group(function () {

                    Route::post('update-status', 'updateStatus')->name('update.status');
                    Route::post('bulk', 'bulk')->name('bulk');
                    Route::get('restore/{uid?}', 'restore')->name('restore');
               });
               
               #CUSTOM CONTACT IMPORT ROUTES
               Route::prefix('contact-imports')
                         ->controller(ContactImportController::class)
                         ->name("contacts.")
                         ->group(function () {

                    Route::post('toggle-pause/{id?}', 'toggleImportPause')->name('toggle.pause');
               });
          });
     });
});
