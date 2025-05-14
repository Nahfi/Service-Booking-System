<?php

use App\Models\User;



if (!function_exists('parent_user')) {
    function parent_user(): User{
        return app('user.parent');
    }
}