<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Enums\Settings\Admin\NotificationTemplateEnum;
use App\Models\NotificationTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class NotificationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // collect(NotificationTemplateEnum::notificationTemplateEnum())
        // ->except(NotificationTemplate::pluck('slug')->toArray())
        // ->each(function(array $template , string $slug): void{

        //     NotificationTemplate::create([
        //         'slug'       => $slug,
        //         'name'       => Arr::get($template , 'name'),
        //         'subject'    => Arr::get($template , 'subject'),
        //         'mail_body'  => Arr::get($template , 'body'),
        //         'sms_body'   => Arr::get($template , 'sms_body'),
        //         'push_notification_body'   => Arr::get($template , 'push_notification_body' ),
        //         'template_key'             => Arr::get($template , 'template_key'),
        //         'type'                     => Arr::get($template , 'type'),
        //         'is_default'               => Arr::get($template , 'is_default',false),
        //         'is_real_time_disable'     => Arr::get($template , 'is_real_time_disable' ,false),
        //         'is_sms_disable'           => Arr::get($template , 'is_sms_disable' ,false),
        //         'is_mail_disable'          => Arr::get($template , 'is_mail_disable' ,false),
        //         'email_notification'       => Status::INACTIVE,
        //         'sms_notification'         => Status::INACTIVE,
        //         'push_notification'        => Status::INACTIVE,
        //         'site_notificaton'         => Status::INACTIVE,
        //     ]);
        // });
        

    }
}
