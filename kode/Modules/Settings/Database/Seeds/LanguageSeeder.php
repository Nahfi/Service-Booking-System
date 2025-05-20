<?php

namespace Modules\Settings\Database\Seeds;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Settings\Models\Settings;

class LanguageSeeder extends Seeder
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

            Settings::withoutEvents(function () use($user) {

                    $language           = Settings::firstOrNew(['group' => SettingKey::LANGUAGES->value ,'is_default' => true]);
                    $language->status   = Status::ACTIVE;
                    $language->user_id  = $user->id;
                    $language->key      = 'en';
                    $language->value    = json_encode([
                                            'name'          => 'English',
                                            'code'          => 'en',
                                        ]);          
                    $language->save();
            });

        }


      
      
    }
}
