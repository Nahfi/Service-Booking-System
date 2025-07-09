<?php

namespace App\Enums\Contact;

use App\Enums\EnumTrait;

enum ContactChannelEnum: string
{
    use EnumTrait;

     case ALL        = 'all';
     case WHATSAPP   = 'whatsapp';
     case SMS        = 'sms';
     case EMAIL      = 'email';
  
}