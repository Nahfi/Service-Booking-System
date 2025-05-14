<?php

namespace Modules\Settings\Enums;


use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Enums\Settings\StorageKey;
use Illuminate\Support\Arr;

enum DefaultSettings: string
{




     /**
      * Summary of getDefaultSetting
      * @param mixed $key
      * @return mixed
      */
     public static function get(?string $key =  null): mixed{

          $defaultSettings = [

                    SettingKey::SITE_NAME->value            => 'DEMO SITE', 
                    SettingKey::SITE_EMAIL->value           => 'demo@demo.com', 
                    SettingKey::SITE_PHONE->value           => '0123456', 
                    SettingKey::SITE_DESCRIPTION->value     => 'DEMO SITE DESCRIPTION', 
                    SettingKey::PAGINATION_NUMBER->value    => 20, 
                    SettingKey::DATE_FORMAT->value          => 'd M, Y',
                    SettingKey::TIME_FORMAT->value              => 'H:i',
                    SettingKey::TIME_ZONE->value                => 'UTC',
                    SettingKey::DATABASE_NOTIFICATIONS->value   =>  Status::ACTIVE->value,
                    SettingKey::MAX_FILE_UPLOAD->value          =>  4,
                    SettingKey::STORAGE->value                  =>  StorageKey::LOCAL->value,
                    SettingKey::MIME_TYPES->value               =>  json_encode([
                                                                      'png',
                                                                      'jpg',
                                                                      'jpeg'
                                                                    ]),
                    SettingKey::MAX_FILE_SIZE->value            =>  20000, //KB


                    SettingKey::S3_CONFIGURATION->value  => json_encode( [
                                                            's3_key'    => '@@',
                                                            's3_secret' => '@@',
                                                            's3_region' => '@@',
                                                            's3_bucket' => '@@'
                                                       ]),

                    SettingKey::FTP_CONFIGURATION->value  => json_encode( [
                         'host'      => '@@',
                         'port'      => '@@',
                         'user_name' => '@@',
                         'password'  => '@@',
                         'root'      => '/'
                    ]),

               ];

          if($key) return Arr::get($defaultSettings , $key, null);

          return   $defaultSettings;
     }







}
