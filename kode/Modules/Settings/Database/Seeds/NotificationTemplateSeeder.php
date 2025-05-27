<?php

namespace Modules\Settings\Database\Seeds;

use App\Enums\Common\Status;
use App\Enums\Settings\NotificationTemplateEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Modules\Settings\Models\NotificationTemplate;

class NotificationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = getDefaultUser();

         collect(NotificationTemplateEnum::getTemplates())
            ->except(NotificationTemplate::pluck('key')->toArray())
            ->each(function(array $template , string $key) use($user) :void{

                 NotificationTemplate::withoutEvents(function () use($user , $template , $key) {
                    NotificationTemplate::create([
                        'key'                      => $key,
                        'user_id'                  => $user->id,
                        'name'                     => Arr::get($template , 'name'),
                        'subject'                  => Arr::get($template , 'subject'),
                        'mail_body'                => Arr::get($template , 'body'),
                        'sms_body'                 => Arr::get($template , 'sms_body'),
                        'push_notification_body'   => Arr::get($template , 'push_notification_body' ),
                        'template_key'             => Arr::get($template , 'template_key'),
                        'type'                     => Arr::get($template , 'type'),
                        'real_time_disable'        => Arr::get($template , 'is_real_time_disable' ,false),
                        'sms_disable'              => Arr::get($template , 'is_sms_disable' ,false),
                        'mail_disable'             => Arr::get($template , 'is_mail_disable' ,false),
                        'email_notification'       => Status::ACTIVE,
                        'sms_notification'         => Status::INACTIVE,
                        'push_notification'        => Status::INACTIVE,
                        'site_notificaton'         => Status::INACTIVE
                    ]);
                });
        });
        

    }
}
