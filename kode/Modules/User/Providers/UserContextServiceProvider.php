<?php
namespace Modules\User\Providers;


use Illuminate\Support\ServiceProvider;

class UserContextServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        
        #Globally bind parent user or self
        $this->app->singleton('user.parent', function () {
            $user = getAuthUser('user:api');

            if (!$user) return null;

            $user->loadMissing('parent');

            return $user->parent ?? $user;
        });



        $this->app->singleton('user.setting', function () {
            $user = getAuthUser('user:api');

            if (!$user) return null;

            if ($user->parent_id) {
                $user->loadMissing('parent.settings');
                return $user->parent?->setting;
            }

            $user->loadMissing('settings');
            return $user->setting;
        });



    }
}
