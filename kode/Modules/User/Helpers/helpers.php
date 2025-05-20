<?php

use App\Models\User;



if (!function_exists('parent_user')) {
    function parent_user(): User | null{

        return app()->bound('user.parent') ? app('user.parent') : null;

    }
}