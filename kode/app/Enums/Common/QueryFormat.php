<?php



namespace App\Enums\Common;

use App\Enums\EnumTrait;


enum QueryFormat: string
{
    use EnumTrait;

    case PAGINATED   = "paginated";
    case COLLECTION  = "collection";
  
}