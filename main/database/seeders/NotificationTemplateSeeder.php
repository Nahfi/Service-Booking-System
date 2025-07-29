<?php

namespace Database\Seeders;

use App\Enums\Common\Status;
use App\Enums\Settings\NotificationTemplateEnum;
use App\Models\Admin\NotificationTemplate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class NotificationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

         collect(NotificationTemplateEnum::getTemplates())
            ->except(NotificationTemplate::pluck('key')->toArray())
            ->each(function(array $template , string $key)  :void{
                NotificationTemplate::create([
                    'key'                      => $key,
                    'name'                     => Arr::get($template , 'name'),
                    'subject'                  => Arr::get($template , 'subject'),
                    'mail_body'                => Arr::get($template , 'body'),
                    'template_key'             => Arr::get($template , 'template_key'),
                    'email_notification'       => Status::ACTIVE,
                ]);
        });
    }
}
