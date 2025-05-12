<?php


use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\Api\v1\AuthenticateController;


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

    Route::post('/login', [AuthenticateController::class,'login']);

});