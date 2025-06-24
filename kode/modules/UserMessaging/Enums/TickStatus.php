<?php
namespace Modules\UserMessaging\Enums;

use App\Enums\EnumTrait;

enum TickStatus: string
{

    use EnumTrait;

    case SENT            = 'sent';
    case DELIVERED       = 'delivered';
    case READ            = 'read';



    /**
     * Summary of values
     * @return string
     */
    public function values(): string
    {
        return match($this) 
        {
            self::SENT      => 'Sent',
            self::DELIVERED => 'Delivered',
            self::READ      => 'Read',
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