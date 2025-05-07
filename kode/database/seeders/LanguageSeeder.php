<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $language          = Setting::firstOrNew(['group' => SettingKey::LANGUAGES->value ,'is_default' => true]);
        // $language->status  = Status::ACTIVE;
        // $language->key     = 'en';
        // $language->value   = json_encode([
        //     'name'          => 'English',
        //     'code'          => 'en',
        // ]);          
        // $language->save();
    }
}
