<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::firstOrCreate(['email' => 'demouser@gmail.com'],[
            'name'              => 'demouser',
            'phone'             => '011111111',
            "email_verified_at" =>  Carbon::now(),
            "status"            =>  Status::ACTIVE,
            "password"          =>  '123123'
        ]);

    }
}
