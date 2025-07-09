<?php

namespace App\Enums\SmsMessage;

use App\Enums\EnumTrait;

enum TypeEnum: string
{
    use EnumTrait;

    case API        = "api";
    case ANDROID    = "android";
}
