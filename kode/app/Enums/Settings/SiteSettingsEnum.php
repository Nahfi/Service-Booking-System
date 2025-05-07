<?php

namespace App\Enums\Settings;

use App\Enums\Common\Status;
use App\Enums\Settings\GlobalConfig;
use App\Enums\Settings\InputEnum;
use App\Enums\Settings\SettingKey;
use Carbon\Carbon;

class SiteSettingsEnum
{
    public static function getSettings(): array
    {
        return [
            SettingKey::SITE_NAME->value             => "demo",
            SettingKey::SITE_PHONE->value            => "@@",
            SettingKey::PAGINATION_NUMBER->value     => "@@",
     
            SettingKey::EMAIL->value                 => "demo@gmail.com",

            SettingKey::DEFAULT_SMS_TEMPLATE->value  => "hi {{name}}, {{message}}",
            SettingKey::DEFAULT_MAIL_TEMPLATE->value => "hi {{name}}, {{message}}",
            SettingKey::COPY_RIGHT_TEXT->value               =>'@@@@',
            
            SettingKey::GOOGLE_RECAPTCHA->value => json_encode([
                'key'        => '@@@',
                'secret_key' => '@@@',
                'status'     => Status::ACTIVE->value
            ]),
            SettingKey::STRONG_PASSWORD->value             => Status::ACTIVE->value,
            SettingKey::CAPTCHA_WITH_LOGIN->value          => Status::ACTIVE->value,


            SettingKey::MAX_FILE_SIZE->value    => 20000,
            SettingKey::MAX_FILE_UPLOAD->value  => 4,
            SettingKey::DATABASE_NOTIFICATIONS->value     => Status::ACTIVE->value,
            SettingKey::LOGIN_ATTEMPT_VALIDATION->value   => Status::ACTIVE->value,
            SettingKey::MAX_LOGIN_ATTEMPTS->value         => 5,
            SettingKey::SITE_DESCRIPTION->value           => 'demo description',
            SettingKey::MIME_TYPE->value                  => json_encode(GlobalConfig::SUPPORTED_FILE_TYPE),


        ];
    }
}
