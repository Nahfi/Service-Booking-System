<?php


namespace App\Traits\Common;

use App\Enums\Common\NotificationLogStatus;
use Illuminate\Support\Arr;
use App\Enums\Common\Status;
use App\Jobs\SendNotificationJob;
use App\Enums\Settings\SettingKey;
use App\Enums\Settings\GlobalConfig;
use App\Models\Admin\NotificationTemplate;
use App\Models\Admin\Settings;
use App\Models\NotificationLog;

trait Notify
{

    use Fileable;


    /**
     * Summary of sendNotification
     * @param string $templateKey
     * @param array $data
     * @return bool
     */
    public function sendNotification(string $templateKey,  array $data = [] ): bool
    {


        $template = NotificationTemplate::where('key', $templateKey)
                                    ->first();


        if (!$template) return false;

        $data['custom_data']['subject'] = $template->subject;


        $messageData = [
            'tmpCodes'   => Arr::get($data, 'template_code'),
            'userinfo'   => Arr::get($data, 'receiver_model')
        ];


        $notificationConfigurations = [

            'email_notification' => [
                                        'status'  => $template->email_notification,
                                        'model_scope' => 'mailGateway',
                                        'body'    => $template->mail_body,
                                        'global_template_key' => SettingKey::DEFAULT_MAIL_TEMPLATE->value
                                    ]
        ];


        foreach ($notificationConfigurations as $type => $configuration) {

            if ($configuration['status'] == Status::ACTIVE->value) {

                $body        = $configuration['body'];
                $templateKey = $configuration['global_template_key'];
                $modelScope  = $configuration['model_scope'];

                $gateway =  Settings::{$modelScope}()
                                        ->default()
                                        ->first();

                if ($gateway && !$body) {

                     $message = $this->replacePlaceholders( $body,$templateKey ,...$messageData);
                     $this->createLog(gateway: $gateway, message: $message, data: $data);

                }
            }
        }


        return true;
    }



    /**
     * Summary of replacePlaceholders
     * @param string $body
     * @param string $settingsKey
     * @param array $tmpCodes
     * @param mixed $userinfo
     * @return array|string
     */
    public function replacePlaceholders( string $body ,
                                         string $settingsKey ,
                                         array $tmpCodes,
                                         mixed $userinfo
                                         ): array|string
    {


        $siteLogo = Settings::with(relations: ['file'])
                                ->where('key',SettingKey::SITE_LOGO->value)
                                ->where('group', SettingKey::LOGO->value)
                                ->first();


        $logo = $this->getimageURL(
                                    file    : $siteLogo?->file ,
                                    location: GlobalConfig::FILE_PATH[SettingKey::SITE_LOGO->value]['admin']['path']
                                );


        $settings = Settings::with(relations: ['file'])
                    ->whereIn('key',[
                        SettingKey::SITE_NAME->value,
                        SettingKey::SITE_PHONE->value,
                        SettingKey::SITE_EMAIL->value,
                        $settingsKey])
                    ->pluck('value','key')
                    ->toArray();



         $siteName  = Arr::get( $settings ,  SettingKey::SITE_NAME->value ,'system');

         $sitePhone = Arr::get( $settings ,  SettingKey::SITE_PHONE->value ,'11233');

         $email     = Arr::get( $settings ,  SettingKey::SITE_EMAIL->value ,'system@gmail.com');

         $globalTemplate =  Arr::get( $settings ,  $settingsKey ,'{{message}}');


         return str_replace(
            array_map(function ($key) {
                return '{{' . $key . '}}';
            }, array_keys($tmpCodes)),
            array_values($tmpCodes),
            str_replace([
                                           "{{name}}",
                                           "{{message}}" ,
                                           "{{company_name}}",
                                           "{{phone}}",
                                           "{{email}}",
                                           "{{logo}}"
                                         ],
                                         [
                                             $userinfo->username?? $siteName ,
                                             $body ?? translate('Dummy message') ,
                                             $siteName,
                                             $sitePhone,
                                             $email,
                                             $logo

                                        ], $globalTemplate)
         );

    }



    /**
     * createLog
     *
     * @param Settings $gateway
     * @param string $message
     * @param array $data
     * @param bool $broadcast
     * @param bool $isEmployee
     *
     * @return void
     */
    public function createLog(Settings  $gateway , string $message , array $data): void{

        $notificationLog = new NotificationLog();

        $receiverModel =  Arr::get($data , 'receiver_model');

        $senderModel   =  Arr::get($data , 'sender_model');
        $customData    =  Arr::get($data , 'custom_data');

        if(isset($customData['push_notification']['receiver_model'])) unset($customData['push_notification']['receiver_model']);

        $notificationLog->gateway_id        = $gateway->id;
        $notificationLog->sender_model      = $senderModel ? get_class($senderModel) : null;
        $notificationLog->sender_id         = $senderModel? $senderModel->id : null;
        $notificationLog->receiver_model    = $receiverModel ? get_class($receiverModel) : null;
        $notificationLog->receiver_id       = $receiverModel?->id;
        $notificationLog->custom_data       = $customData;
        $notificationLog->message           = $message;
        $notificationLog->status            = NotificationLogStatus::PENDING;
        $notificationLog->save();

        SendNotificationJob::dispatchSync($notificationLog->load('gateway', 'receiver'));

    }





}
