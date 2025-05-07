<?php

use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['sanitization', 'exception.handler']], function () { 

    // Route::post('/login', [LoginController::class, 'login']);

    // Route::prefix('password')->controller(PasswordResetController::class)->group(function () {

    //     Route::post('/verify/email', 'verifyEmail');
    //     Route::post('/update', 'passwordUpdate');
    // });

    // Route::get('/guest/config/{business_id}', [GeneralSettingController::class, 'guestConfiguration']);

    // Route::group(['middleware' => ['auth:sanctum', 'check.business', 'employee.api.token', 'kyc']], function () { 

    //     Route::post('/logout', [LoginController::class, 'logout']);

       
    // });
});
