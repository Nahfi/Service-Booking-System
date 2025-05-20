<?php

namespace Modules\Settings\Database\Seeds;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class SettingsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            // SettingsSeeder::class,
            // LanguageSeeder::class,
            EmailGatewaySeeder::class,
        ]);

    }
}
