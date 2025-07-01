<?php

namespace modules\Contact\Enums;

use App\Enums\EnumTrait;

enum ContactChannelEnum: string
{
    use EnumTrait;

     case ALL        = 'all';
     case WHATSAPP   = 'whatsapp';
     case SMS        = 'sms';
     case EMAIL      = 'email';
  
}