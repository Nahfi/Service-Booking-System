<?php

namespace App\Enums\Contact;

use App\Enums\EnumTrait;

enum ContactJobEnum: string
{
    use EnumTrait;

    case PENDING    = 'pending';
    case PROCESSING = 'processing';
    case COMPLETED  = 'completed';
    case FAILED     = 'failed';
  
}