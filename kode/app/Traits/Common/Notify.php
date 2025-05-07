<?php


namespace App\Traits\Common;

use App\Models\Setting;
use Illuminate\Support\Arr;
use App\Enums\Common\Status;
use App\Models\NotificationLog;
use App\Jobs\SendNotificationJob;
use App\Enums\Settings\SettingKey;
use App\Enums\Settings\GlobalConfig;
use App\Models\DatabaseNotification;
use App\Models\NotificationTemplate;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\Settings\NotificationLogStatus;
use App\Models\User;

trait Notify
{

    use Fileable;


    /**
     * sendNotification
     *
     * @param string $templateKey
     * @param null|int|null $bo_id
     * @param array $data
     * @param bool $broadcast
     * @param bool $isEmployee
     * 
     * @return bool
     */
    public function sendNotification(string $templateKey, null|int $bo_id = null,  array $data = [], bool $broadcast = false, bool $isEmployee = false): bool
    {
        
        $template = NotificationTemplate::when($bo_id , fn(Builder $builder): Builder =>
                             $builder->where('bo_id', $bo_id))->where('slug', $templateKey)
                             ->first();


                             
        if (!$template) return false;

        $data['custom_data']['subject'] = $template->subject; 

        $siteLogo = Setting::with(relations: ['file'])
                            ->when($bo_id , 
                            fn(Builder $q):Builder => $q->where('bo_id',$bo_id) , 
                            fn(Builder $q):Builder =>   $q->system() )
                            ->where('key',SettingKey::SITE_LOGO->value)
                            ->where('group', SettingKey::LOGO->value)
                            ->first();




        $messageData = [
            'tmpCodes' => Arr::get($data, 'template_code'),
            'userinfo' => Arr::get($data, 'receiver_model'),
            'logo'     => $this->getimageURL(
                                    file    : @$siteLogo->file , 
                                    location: GlobalConfig::FILE_PATH[SettingKey::SITE_LOGO->value][ $template->bo_id ?'admin' : 'business']['path']),
        ];




        $notifications = [

            'email_notification' => [ 
                                        'status'  => $template->email_notification, 
                                        'gateway' => 'mailGateway', 
                                        'body'    => $template->mail_body,
                                        'global_template_key' => SettingKey::DEFAULT_MAIL_TEMPLATE->value
                                    ],

            'sms_notification' =>   [ 
                                        'status'  => $template->sms_notification, 
                                        'gateway' => 'smsGateway', 
                                        'body'   => $template->sms_body,
                                        'global_template_key' => SettingKey::DEFAULT_SMS_TEMPLATE->value
                                    ],

            'push_notification' =>  [
                                        'status'  => $template->push_notification,
                                        'gateway' => 'firebaseGateway', 
                                        'body'    => $template->push_notification_body,
                                        'global_template_key' => SettingKey::DEFAULT_PUSH_TEMPLATE->value
                                    ]
        ];

        



      
        foreach ($notifications as $type => $details) {
 
            if ($details['status'] == Status::ACTIVE->value) {
                

                $gateway = getNotificationGateway($type , $details , $template , $bo_id );

        
                                        
                if ($gateway && !is_null($details['body'])) {

                    $message = $this->replacePlaceholders( $details['body'],$details['global_template_key'],$bo_id, ...$messageData);
        

      
                    $this->createLog(gateway: $gateway, message: $message, data: $data, broadcast:$broadcast, isEmployee:$isEmployee);
                }
            }
        }

        
        if ($template->site_notificaton == Status::ACTIVE->value && $template->push_notification_body) {
            
            $message = $this->replacePlaceholders($template->push_notification_body, SettingKey::DEFAULT_PUSH_TEMPLATE->value ,$bo_id, ...$messageData);
            
            $this->createDatabaseNotification(message: $message, data: $data);
        }
        
        return true;
    }


    /**
     * Summary of replacePlaceholders
     * @param string $body
     * @param array $tmpCodes
     * @param object $userinfo
     * @return array|string
     */
    public function replacePlaceholders( string $body , 
                                         string $settingsKey ,
                                         int | string | null $bo_id = null ,
                                         array $tmpCodes,
                                         mixed $userinfo, 
                                         mixed $logo): array|string
    {


         $siteName  =   site_settings(SettingKey::SITE_NAME->value);
         $sitePhone =   site_settings(SettingKey::SITE_PHONE->value);
         $email     =   site_settings(SettingKey::EMAIL->value);

         $globalTemplate =  site_settings($settingsKey);

         if($bo_id){

            $user  = User::whereNull('parent_id')
                               ->where('id',$bo_id)
                               ->first();
                        
            if($user){
                $siteName            =   business_site_settings($user , SettingKey::SITE_NAME->value);
                $sitePhone           =   business_site_settings($user , SettingKey::SITE_PHONE->value);
                $email               =   business_site_settings($user, SettingKey::EMAIL->value);    
                $globalTemplate      =   business_site_settings($user, $settingsKey);    

                
            }           
         }


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
                                             @$userinfo->username ?: @$userinfo->name, 
                                             @$body , 
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
     * @param Setting $gateway
     * @param string $message
     * @param array $data
     * @param bool $broadcast
     * @param bool $isEmployee
     * 
     * @return void
     */
    public function createLog(Setting  $gateway , string $message , array $data, bool $broadcast, bool $isEmployee): void{

        $notificationLog = new NotificationLog();

        $receiverModel =  Arr::get($data , 'receiver_model');

        $senderModel   =  Arr::get($data , 'sender_model');
        $customData    =  Arr::get($data , 'custom_data');
        
        if(isset($customData['push_notification']['receiver_model'])) unset($customData['push_notification']['receiver_model']);

        $notificationLog->gateway_id        = $gateway->id;
        $notificationLog->sender_model      = $senderModel ? get_class($senderModel) : null;
        
        $notificationLog->sender_id         = $senderModel? $senderModel->id : null;
        $notificationLog->receiver_model    = $receiverModel ? get_class($receiverModel) : null;
        
        $notificationLog->receiver_id       = @$receiverModel?->id;

        $notificationLog->custom_data       = $customData;
        $notificationLog->message           = $message;
        $notificationLog->status            = NotificationLogStatus::PENDING;
        $notificationLog->save();
        
        SendNotificationJob::dispatchSync($notificationLog->load('gateway', 'receiver'), $broadcast, $isEmployee);

    }




    /**
     * Summary of createDatabaseNotification
     * @param string $message
     * @param array $data
     * @return void
     */
    public function createDatabaseNotification(string $message , array $data ): void{

        $dbNotification = Arr::get($data ,'custom_data.push_notification');

        if($dbNotification){

            $receiverModel =  Arr::get($dbNotification , 'receiver_model');
            if($receiverModel) {

                $notification  = new DatabaseNotification();
                $notification->receiver_model    = get_class($receiverModel);
                $notification->reciever_id       = $receiverModel->id;
                $notification->payload           = Arr::get($dbNotification , 'payload');
                $notification->message           = $message;
                $notification->is_read           = false;
                $notification->save();
            }
        }
    }
}
