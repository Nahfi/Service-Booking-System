<?php


use Illuminate\Support\Facades\Route;
use Modules\User\Enums\RateLimit;
use Modules\User\Http\Controllers\Api\V1\AuthenticateController;
use Modules\User\Http\Controllers\Api\V1\PasswordResetController;
use Modules\User\Http\Controllers\Api\V1\ProfileController;
use Modules\User\Http\Controllers\Api\V1\RoleController;
use Modules\User\Http\Controllers\Api\V1\TwoFactorController;
use Modules\User\Http\Controllers\Api\V1\UserController;
use Modules\User\Http\Controllers\Api\V1\UserSessionController;

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

    #AUTH ROUTE
    Route::post('/login', [AuthenticateController::class,'login'])->middleware(['throttle:' .RateLimit::LOGIN->toThrottleString()]);

    Route::middleware(['throttle:' .RateLimit::PASSWORD_RESET->toThrottleString()])->prefix('password')->controller(PasswordResetController::class)->group(function () {

        Route::post('/verify-email', 'verifyEmail');
        Route::post('/update', 'passwordUpdate');
    });


    #USER ROUTE
    Route::group(['middleware' => ['auth:sanctum', 'user.api.token']], function () {

        Route::post('/logout', [AuthenticateController::class, 'logout'])->middleware(['throttle:' .RateLimit::LOGOUT->toThrottleString()]);

        Route::group(['middleware' => ['throttle:' .RateLimit::USER->toThrottleString()]], function () {


            #RESOURCE ROUTES
            Route::apiResources(resources: [
                'roles'     => RoleController::class,
                'users'     => UserController::class,
                'sessions'  => UserSessionController::class,
                'profile'   => ProfileController::class,
            ]);

            #CUSTOM PROFILE ROUTE
            Route::controller(ProfileController::class)->prefix('profile/')->group(function () {
                Route::post('update-fcm-token', 'updateFcmToken');
                Route::post('update-password', 'passwordUpdate');
                Route::post('destroy-account', 'destroyAccount');
                Route::post('toggle-online-status', 'toggleOnlineStatus');
            });

            #2FA ROUTES
            Route::controller(TwoFactorController::class)->prefix('2fa/')->group(function () {

                Route::get('setup', 'setup');
                Route::post('verify', 'verify');
                Route::post('disable', 'disable');
                Route::post('recovery-code/regenerate', 'regenerateRecoveryCodes');
            });

            Route::post('roles/update-status', [RoleController::class, 'updateStatus']);
            Route::post('sessions/logout-others', [UserSessionController::class, 'logoutOtherSessions']);

            #CUSTOM USER ROUTE
            Route::controller(UserController::class)->prefix('users/')->group(function () {
                Route::post('update-status', 'updateStatus');
                Route::get('restore/{id}', 'restore');
                Route::post('bulk', 'bulk');
            });


        });

    });

});
