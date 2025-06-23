<?php

namespace Modules\Settings\Database\Seeds;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use Illuminate\Database\Seeder;
use Modules\Settings\Enums\DefaultSettings;
use Modules\Settings\Models\Settings;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = getDefaultUser();

        if($user){

           $settings =  collect(DefaultSettings::get())
                            ->except(Settings::where('user_id',  $user->id)->pluck('key')->toArray())
                            ->map(fn(mixed $value , string $key):array =>
                                array(
                                        'user_id'     => $user->id,
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
}
