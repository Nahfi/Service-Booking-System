<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{

    const  API_ROUTE_PREFIX  = 'routes/api/v1/';
    const  GLOBAL_MIDDLEWARE = ['api','cors','app.verification'];



    /**
     * Register the application's routes.
     *
     * @return void
     */
    public function boot()
    {
        $this->mapApiRoutes();
    }

    /**
     * Map the API routes with their prefixes.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {




        // User API routes
        Route::prefix('api/user')
            ->middleware(SELF::GLOBAL_MIDDLEWARE)
            ->group(base_path(SELF::API_ROUTE_PREFIX.'user/api.php'));


    }
}
