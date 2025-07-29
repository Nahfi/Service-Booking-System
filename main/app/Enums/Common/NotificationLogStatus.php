<?php

namespace App\Enums\Common;

use App\Enums\EnumTrait;

enum NotificationLogStatus: string
{
    use EnumTrait;
    case PENDING                 = "pending";
    case SUCCESS                 = "success";
    case FAILED                  = "failed";


    /**
     * Summary of getValues
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }


}
