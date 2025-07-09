<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum FileKey: string
{
    use EnumTrait;

    case AVATAR                      = "avatar";
    case MESSAGE_FILE                = "message_file";
    case CONTACT_IMPORT_FILE         = "contact_import_file";

}