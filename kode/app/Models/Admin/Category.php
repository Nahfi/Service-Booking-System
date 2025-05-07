<?php

namespace App\Models\Admin;

use App\Models\User;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use App\Models\UserBusinessSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Category extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];

    /**
     * Summary of scopeActive
     * @param Builder $query
     * @return Builder
     */
    public function scopeActive(Builder $query): Builder
    {

        return $query->where('status', Status::ACTIVE);
    }

    /**
     * Summary of businessSettings
     * @return HasMany
     */
    public function businessSettings(): HasMany
    {

        return $this->hasMany(UserBusinessSetting::class, 'bo_category_id');
    }

    /**
     * Summary of businesses
     * @return HasManyThrough
     */
    public function businesses(): HasManyThrough
    {

        return $this->hasManyThrough(
            User::class,
            UserBusinessSetting::class,
            'bo_category_id',
            'id',
            'id',
            'user_id'
        )->owner();
    }

    /**
     * Summary of scopeBusiness
     * @param Builder $query
     * @return Builder
     */
    public function scopeWithBusinessCount(Builder $query): Builder
    {

        return $query->withCount('businessSettings');
    }
}
