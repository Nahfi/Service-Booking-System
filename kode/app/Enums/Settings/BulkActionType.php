<?php



namespace App\Enums\Settings;

use App\Enums\EnumTrait;


enum BulkActionType: string
{
    use EnumTrait;

    case RESTORE       = "restore";
    case FORCE_DELETE  = "force_delete";
    case DELETE        = "delete";
    case STATUS        = "status";
  
}