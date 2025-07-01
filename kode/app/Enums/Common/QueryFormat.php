<?php



namespace App\Enums\Settings;

use App\Enums\EnumTrait;


enum QueryFormat: string
{
    use EnumTrait;

    case PAGINATED   = "paginated";
    case COLLECTION  = "collection";
  
}