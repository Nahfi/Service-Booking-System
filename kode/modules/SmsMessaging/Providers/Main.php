<?php

namespace Modules\SmsMessaging\Providers;

use App\Enums\Settings\GlobalConfig;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider as Provider;

class Main extends Provider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->loadConfig();
        $this->loadRoutes();
    }

    /**
     * Boot the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishConfig();
        $this->loadViews();
        $this->loadViewComponents();
        $this->loadTranslations();
        $this->loadMigrations();
    }

    /**
     * Load config.
     *
     * @return void
     */
    protected function loadConfig()
    {
        $this->mergeConfigFrom(
            __DIR__ . '/../Config/config.php', 'sms-messaging'
        );
    }

    /**
     * Publish config.
     *
     * @return void
     */
    protected function publishConfig()
    {
        $this->publishes([
            __DIR__ . '/../Config/config.php' => config_path('sms-messaging.php'),
        ], 'config');
    }

    /**
     * Load views.
     *
     * @return void
     */
    public function loadViews()
    {
        $viewPath = resource_path('views/modules/sms-messaging');

        $sourcePath = __DIR__ . '/../Resources/views';

        $this->publishes([
            $sourcePath => $viewPath
        ],'views');

        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path . '/modules/sms-messaging';
        }, \Config::get('view.paths')), [$sourcePath]), 'sms-messaging');
    }

    /**
     * Load view components.
     *
     * @return void
     */
    public function loadViewComponents()
    {
        Blade::componentNamespace('Modules\SmsMessaging\View\Components', 'sms-messaging');
    }

    /**
     * Load translations.
     *
     * @return void
     */
    public function loadTranslations()
    {
        $langPath = resource_path('lang/modules/sms-messaging');

        if (is_dir($langPath)) {
            $this->loadTranslationsFrom($langPath, 'sms-messaging');
        } else {
            $this->loadTranslationsFrom(__DIR__ . '/../Resources/lang/en', 'sms-messaging');
        }
    }

    /**
     * Load migrations.
     *
     * @return void
     */
    public function loadMigrations()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
    }

    /**
     * Load routes.
     *
     * @return void
     */
    public function loadRoutes()
    {
        if (app()->routesAreCached()) {
            return;
        }

        $routes = [
            'web.php',
            'api.php',
        ];

        foreach ($routes as $route) {
            $this->loadRoutesFrom(__DIR__ . '/../Routes/' . $route);
        }
        Route::prefix(GlobalConfig::USER_API_ROUTE_PREFIX)
                    ->middleware(GlobalConfig::GLOBAL_MIDDLEWARE)
                    ->group(__DIR__ . '/../Routes/api/v1/api.php');

        Route::prefix(GlobalConfig::USER_API_ROUTE_PREFIX)
                    ->group(__DIR__ . '/../Routes/api/v1/app/api.php');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}
