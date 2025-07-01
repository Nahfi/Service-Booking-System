<?php

namespace modules\Contact\Enums;

use App\Enums\EnumTrait;

enum ContactImportEnum: string
{
    use EnumTrait;

    case PENDING    = 'pending';
    case PROCESSING = 'processing';
    case COMPLETED  = 'completed';
    case FAILED     = 'failed';
  
}