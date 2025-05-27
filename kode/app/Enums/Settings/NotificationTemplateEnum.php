<?php
  
  namespace App\Enums\Settings;

use App\Enums\EnumTrait;
use Illuminate\Support\Arr;

enum NotificationTemplateEnum :string {

    use EnumTrait;
    

    case TEST_MAIL                                  = 'TEST_MAIL';
    case PASSWORD_RESET                             = 'PASSWORD_RESET';
   
    

    /**
     * Get Notification Template
     *
     * @return array
     */
    public static function getTemplates() : array {

       return [
                  self::PASSWORD_RESET->value => [

                          "name"      => key_to_value(self::PASSWORD_RESET->value),
                          "subject"   => "Password Reset",
                          "body"      => "We have received a request to reset the password for your account on {{otp_code}} and Request time {{time}}",
                          "sms_body"  => "We have received a request to reset the password for your account on {{otp_code}} and Request time {{time}}",
                          "template_key" => [
                              'otp_code'         => "Password Reset Code",
                              'time'             => "Password Reset Time",
                              'operating_system' => "Operating system",
                              'ip'               => "IP address of the user",
                          ],

                          'type' => NotificationType::BOTH,
                          'is_real_time_disable' =>  true
                  ],

      
                    self::TEST_MAIL->value => [

                        "name"      => key_to_value(self::TEST_MAIL->value),
                        "subject"   => "Test Mail",
                        "body"      => "This is testing mail for mail configuration Request time<span style=\"background-color: rgb(255, 255, 0);\"> {{time}}</span></h5>",
                        "template_key" => ([
                            'time' => "Time",
                        ]),

                        'is_real_time_disable' =>  true,
                        'is_sms_disable'       =>  true,
                        'type' => NotificationType::OUTGOING,
                        
                    ],    
                ];
    }
}