<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum TokenKey: string
{
    use EnumTrait;

    case USER_AUTH_TOKEN                = "userAuthToken";
    case USER_AUTH_TOKEN_ABILITIES      = "user";
    case SMS_PROVIDER_TOKEN_ABILITIES   = "provider";
}