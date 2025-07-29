<?php

namespace App\Providers;

use App\Builders\ApiResponseBuilder;
use Illuminate\Support\ServiceProvider;

class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
     // Bind the ApiResponseBuilder to the service container
        $this->app->singleton(abstract: 'ApiResponseBuilder', concrete: function (): ApiResponseBuilder {
            return new ApiResponseBuilder();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
  
    }
}
