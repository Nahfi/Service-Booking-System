<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Enums\Settings\Admin\Gateway\MailGatewayEnum;
use App\Enums\Settings\SettingKey;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class NotificationGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       
        // #MAIL GATEWAY
        // collect(MailGatewayEnum::getGatewayCredential())
        // ->except(Setting::system()
        //                     ->mailGateway()
        //                     ->pluck('key')->toArray())
        //  ->each(function(array $gateway , string $code): void{

        //   $credential = Arr::get($gateway ,'value' ,  null);

        //   Setting::firstOrCreate(attributes: [ 
        //                                     'key'       => $code ,
        //                                     'status'    => Status::ACTIVE ,
        //                                     'group'     => SettingKey::NOTIFICATION_GATEWAY->value,
        //                                     'sub_group' => SettingKey::MAIL_GATEWAY->value,
        //                                 ],values: [
        //                                     'value' =>  is_array($credential)  ?  json_encode($credential) : null
        //                                 ]);
        // });



    }
}
