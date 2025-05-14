<?php
namespace Modules\User\Providers;

use Illuminate\Support\Facades\Cache;
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

            $targetId = $user->parent_id ?: $user->id;
            $cacheKey = 'user:parent:' . $targetId;

             return Cache::rememberForever($cacheKey, function () use ($user) {
                $user->loadMissing('parent');
                return $user->parent ?? $user;
            });

        });



        $this->app->singleton('user.settings', function () {
            $user = getAuthUser('user:api');

            if (!$user) return null;

            $targetId = $user->parent_id ?: $user->id;
            $cacheKey = 'user:settings:' . $targetId;


             return Cache::rememberForever($cacheKey, function () use ($user) {
                if ($user->parent_id) {
                    $user->loadMissing('parent.setting');
                    return $user->parent?->setting;
                }

                $user->loadMissing('setting');
                return $user->setting;
            });


        });



    }
}
