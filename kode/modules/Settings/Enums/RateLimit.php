<?php
namespace Modules\Settings\Enums;
enum RateLimit: string
{
    case SETTINGS = '100,2'; 


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