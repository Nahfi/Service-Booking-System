<?php

namespace App\Providers;

use App\Enums\Settings\GlobalConfig;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{





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
        Route::prefix('api/user')
            ->middleware(GlobalConfig::GLOBAL_MIDDLEWARE)
            ->group(base_path('routes/api/v1/user/api.php'));

    }
}
