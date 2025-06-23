<?php

namespace Modules\Settings\Database\Seeds;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Modules\Settings\Enums\MailGatewayEnum;
use Modules\Settings\Models\Settings;

class EmailGatewaySeeder extends Seeder
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


            collect(MailGatewayEnum::getGatewayCredential())
                ->except(
                    Settings::where('user_id', $user->id)
                                    ->mailGateway()
                                    ->pluck('key')
                                    ->toArray()
                        )
                ->each(function(array $gateway , string $code) use($user): void{

                $credential = Arr::get($gateway ,'value' ,  null);

                Settings::withoutEvents(function () use($user ,$code , $credential) {

                    Settings::firstOrCreate(attributes: [ 
                                                'key'       => $code ,
                                                'status'    => Status::ACTIVE ,
                                                'group'     => SettingKey::NOTIFICATION_GATEWAY->value,
                                                'sub_group' => SettingKey::MAIL_GATEWAY->value,
                                                'user_id'     => $user->id,
                                            ],values: [
                                                'value' =>  is_array($credential) 
                                                            ? json_encode($credential) 
                                                            : null
                                            ]);
                    }  );
                });

        }
        
    }
}
