<?php

namespace App\Jobs;

use App\Enums\Settings\SettingKey;

use App\Notify\SendMail;
use App\Notify\SendPushNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Modules\Settings\Models\NotificationLog as ModelsNotificationLog;

class SendNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public ModelsNotificationLog $log)
    {
        $this->log          = $log;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $receiverInstance = @$this->log?->receiver;

        if($this->log->gateway) {

            $subGroup = $this->log->gateway->sub_group;
            
            switch (true) {
                case ($subGroup == SettingKey::MAIL_GATEWAY->value && $receiverInstance):
                    SendMail::send($this->log, $receiverInstance);
                    break;
    
                case ($subGroup == SettingKey::FIREBASE_GATEWAY->value):
                    SendPushNotification::send($this->log, $receiverInstance);
                    break;
            }
          
        }

    }
}
