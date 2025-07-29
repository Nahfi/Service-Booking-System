<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum ErrorEventKey: string
{
    use EnumTrait;

    case UNAUTHORIZED_REQUEST           = "unauthorized_request";


}
