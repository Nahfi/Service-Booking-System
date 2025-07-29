<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum CacheKey: string
{
    use EnumTrait;

    case DEFAULT_SETTINGS          = "default_settings";
    case LANGUAGES                 = "languages";




}
