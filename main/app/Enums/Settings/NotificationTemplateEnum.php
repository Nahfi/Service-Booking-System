<?php
namespace App\Enums\Settings;

use App\Enums\EnumTrait;
enum NotificationTemplateEnum :string {

    use EnumTrait;

    case TEST_MAIL                                  = 'TEST_MAIL';
    case OTP_VERIFY                                 = 'OTP_VERIFY';
    case PASSWORD_RESET                             = 'PASSWORD_RESET';
    case REGISTRATION_VERIFY                        = 'REGISTRATION_VERIFY';

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

                        'is_default' =>  true,


                ],

                self::REGISTRATION_VERIFY->value => [

                    "name"      => key_to_value(self::REGISTRATION_VERIFY->value),
                    "subject"   => "Registration Verify",
                    "body"      => "We have received a request to create an account, you need to verify email first, your verification code is {{otp_code}} and request time {{time}}",
                    "sms_body"  => "We have received a request to create an account, you need to verify email first, your verification code is {{otp_code}} and request time {{time}}",
                    "template_key" => ([
                        'otp_code'  => "Verification Code",
                        'time' => "Time",
                        'operating_system' => "Operating system",
                        'ip'               => "IP address",
                    ]),

                    'is_real_time_disable' =>  true,

                ],

                self::TEST_MAIL->value => [

                    "name"      => key_to_value(self::TEST_MAIL->value),
                    "subject"   => "Test Mail",
                    "body"      => "This is testing mail for mail configuration Request time<span style=\"background-color: rgb(255, 255, 0);\"> {{time}}</span></h5>",
                    "template_key" => ([
                        'time' => "Time",
                    ]),
                    'is_default' =>  true,

                ],
            ];
    }
}
