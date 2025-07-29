<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Enums\Settings\DefaultSettings;
use App\Enums\Settings\SettingKey;
use App\Models\Admin\Settings;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            $settings =  collect(DefaultSettings::get())
                        ->except(Settings::pluck('key')->toArray())
                        ->map(fn(mixed $value , string $key):array =>
                            array(
                                    'group'       => SettingKey::GENERAL->value,
                                    'key'         => $key,
                                    'value'       => $value,
                                    'status'      => Status::ACTIVE,
                                    'is_default'  => 1,
                                    'created_at'  => now(),
                                )
                        )->values()->all();

            Settings::insert($settings);
            optimize_clear();
    }
}
