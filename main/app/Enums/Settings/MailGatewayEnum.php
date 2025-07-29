<?php
namespace App\Enums\Settings;

use App\Enums\EnumTrait;
use Illuminate\Support\Arr;

enum MailGatewayEnum: string{


    use EnumTrait;

    case SMTP               = '101SMTP';
    case PHPMAIL            = '104PHP';
    case SENDGRID           = '102SENDGRID';



    /**
     * Get Mail Gateway Credential
     *
     * @return array
     */
    public static function getGatewayCredential(?string $gateway =  null): array{


       $gateways =   [
                       self::SMTP->value => [
                            "value" => [
                                'name'       => "SMTP",
                                'driver'     => "@@",
                                'host'       => "@@",
                                'port'       => "@@",
                                'encryption' => "@@",
                                'username'   => "@@",
                                'password'   => "@@",
                                "from" => [
                                    "address" => "@@",
                                    "name"    => "@@",
                                ]
                            ],
                            'is_default' => true
                        ],

                        self::PHPMAIL->value => [
                            "value" => [
                                'name'       => "PHP Mail",
                            ]
                        ],
                        self::SENDGRID->value => [
                            "value" => [
                                'name'       => "Sendgrid",
                                'app_key' => "@@",
                                "from" => [
                                    "address" => "@@",
                                    "name"    => "@@",
                                ]

                            ]
                        ],

                ];

       return $gateway
                  ? Arr::get($gateways , $gateway , [])
                  : $gateways ;


    }
}
