<?php

use Illuminate\Support\Facades\Route;
use Spatie\RobotsMiddleware\RobotsMiddleware;

// Route::get('/sitemap.xml', function () {
//     $sitemap = \Spatie\Sitemap\Sitemap::create()
//         ->add('/')
//         ->add('/about');
//     return $sitemap->render();
// });

Route::get('/{any?}', function () {

    if (request()->server('HTTP_USER_AGENT') && str_contains(request()->server('HTTP_USER_AGENT'), 'bot')) {
        $path = public_path('build' . request()->path() . '/index.html');
        if (file_exists($path)) {
            return response()->file($path);
        }
    }
    return view('app');
})->middleware(RobotsMiddleware::class)->where('any', '.*');