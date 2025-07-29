<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum BookingStatus: string
{
    use EnumTrait;
    case PENDING                 = "pending";
    case SUCCESS                 = "success";
    case CANCELLED               = "cancelled";
    case COMPLETED               = "completed";


    /**
     * Summary of getValues
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }


}
