<?php

namespace App\Jobs;

use App\Enums\Settings\SettingKey;

use App\Models\NotificationLog;
use App\Notify\SendMail;
use App\Notify\SendPushNotification;
use App\Notify\SendSMS;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public NotificationLog $log, public bool $broadcast, public bool $isEmployee)
    {
        $this->log          = $log;
        $this->broadcast    = $broadcast;
        $this->isEmployee   = $isEmployee;
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
                    SendPushNotification::send($this->log, $receiverInstance, $this->broadcast, $this->isEmployee);
                    break;
            }
          
        }

    }
}
