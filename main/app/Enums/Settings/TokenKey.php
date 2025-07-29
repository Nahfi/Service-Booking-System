<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum TokenKey: string
{
    use EnumTrait;

    case USER_AUTH_TOKEN                = "userAuthToken";
    case USER_AUTH_TOKEN_ABILITIES      = "user";

    case ADMIN_AUTH_TOKEN                = "adminAuthToken";
    case ADMIN_AUTH_TOKEN_ABILITIES       = "admin";
}
