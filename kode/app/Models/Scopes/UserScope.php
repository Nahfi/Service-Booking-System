<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class UserScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {

        $user = getAuthUser('user_api');

        if ($user) {
            $builder->where('user_id', $user->parent_id ? $user->parent_id : $user->id);
        }
    }
}
