<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([

            // AdminSeeder::class,

            // CurrencySeeder::class,

            // LanguageSeeder::class,

            // PaymentGatewaySeeder::class,
            
            // NotificationGatewaySeeder::class,

            GeneralSettingSeeder::class,

            // PlanSeeder::class,

            // NotificationTemplateSeeder::class,

            // BusinessRoleSeeder::class
        ]);
    }
}
