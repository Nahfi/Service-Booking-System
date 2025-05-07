<?php

namespace Database\Seeders;

use App\Enums\Settings\Admin\SiteSettingsEnum;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use App\Enums\Settings\CacheKey;
use App\Enums\Settings\SettingKey;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        // $settings =  collect(SiteSettingsEnum::getSettings())
        //                     ->except(Setting::system()->default()->pluck('key')->toArray())
        //                     ->map(fn(mixed $value , string $key): array =>
        //                             array(
        //                                 'group'  => SettingKey::DEFAULT->value,
        //                                 'key'    => $key,
        //                                 'value'  => $value)
        //                         )->values()->all();


        // Setting::insert($settings);
    
        // Cache::forget(CacheKey::DEFAULT_SETTINGS->value); 

    }
}
