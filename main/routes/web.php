<?php

use Illuminate\Support\Facades\Route;
use Spatie\RobotsMiddleware\RobotsMiddleware;



Route::get('/{any?}', function () {
    return view('app');
})->middleware(RobotsMiddleware::class)->where('any',  '^(?!api).*$');
