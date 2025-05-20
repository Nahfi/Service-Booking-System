<?php

use Modules\Settings\Enums\DefaultSettings;
use Modules\Settings\Models\Settings;



if (!function_exists('site_settings')) {
    function site_settings(? string  $key): string|array|Settings|null{


        $settings =  app()->bound('user.settings') ? app('user.settings') : null;


        if($settings){
            $setting  =   $settings?->where('key',$key)?->first();
            if($setting) return $setting->value;
        }

        return DefaultSettings::get($key);
    }
}



