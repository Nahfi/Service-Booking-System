<?php
namespace Modules\User\Enums;

enum RateLimit: string
{
    case LOGIN = '5,1'; 
    case LOGOUT = '4,1'; 
    case REGISTER = '3,1'; 
    case PASSWORD_RESET = '10,1'; 
    case USER = '15,2'; 
    case SETTINGS = '10,2'; 


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