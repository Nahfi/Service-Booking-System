<?php
namespace Modules\UserMessaging\Enums;

enum RateLimit: string
{

    case MESSAGING = '10,2'; 


    public function attempts(): int
    {
        return (int) explode(',', $this->value)[0];
    }

    public function minutes(): int
    {
        return (int) explode(',', $this->value)[1];
    }

    public function toThrottleString(): string
    {
        return $this->value;
    }
}