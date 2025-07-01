<?php
namespace modules\Contact\Enums;

use App\Enums\EnumTrait;

enum ChannelEnum: string
{
     use EnumTrait;
     
     case ALL        = 'all';
     case WHATSAPP   = 'whatsapp';
     case SMS        = 'sms';
     case EMAIL      = 'email';



     /**
          * Summary of values
          * @return string
          */
     public function values(): string
     {
          return match($this) 
          {
               self::ALL         => 'All',
               self::WHATSAPP    => 'WhatsApp',
               self::SMS         => 'Sms',
               self::EMAIL       => 'Email',
          };
     }




     /**
          * Summary of getValues
          * @return array
          */
     public static function getValues(): array
     {
          return array_map(fn($case) => $case->value, self::cases());
     }
}