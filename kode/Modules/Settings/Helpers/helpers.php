<?php

use Modules\Settings\Enums\DefaultSettings;
use Modules\Settings\Models\Settings;



if (!function_exists('site_settings')) {
    function site_settings(? string  $key): string|array|Settings|null{

        $settings = app('user.settings');
        if($settings){
            $setting  =   $settings?->where('key',$key)?->first();
            if($setting) $setting->value;
        }

        return DefaultSettings::get($key);
    }
}



