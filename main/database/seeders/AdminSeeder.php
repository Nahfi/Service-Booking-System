<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Models\Admin\Admin;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::firstOrCreate(['email' => 'demoadmin@gmail.com'],[
            'name'              => 'demoadmin',
            'phone'             => '011111111',
            "email_verified_at" =>  Carbon::now(),
            "status"            =>  Status::ACTIVE,
            "password"          =>  '123123'
        ]);
    }
}
