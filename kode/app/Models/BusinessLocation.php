<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BusinessLocation extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['addresses' => 'object'];
    }
    /**
     * Summary of business
     * @return BelongsTo
     */
    public function business(): BelongsTo{
        return $this->belongsTo(User::class, 'bo_id');
    }

    /**
     * Summary of businessSetting
     * @return BelongsTo
     */
    public function businessSetting(): BelongsTo{
        return $this->belongsTo(UserBusinessSetting::class, 'bo_id', 'user_id');
    }

    /**
     * Summary of employees
     * @return HasMany
     */
    public function employees(): HasMany{
        return $this->hasMany(User::class, 'location_id');
    }
    
    /**
     * accessPoint
     *
     * @return HasOne
     */
    public function accessPoint(): HasOne{
        return $this->hasOne(AccessPointWhiteList::class, 'location_id');
    }

    /**
     * companies
     *
     * @return HasOne
     */
    public function companies(): HasMany{
        return $this->hasMany(Company::class, 'location_id');
    }
}
