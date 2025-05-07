<?php

namespace App\Models;

use App\Models\Admin\Category;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserBusinessSetting extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void{
        static::creating(callback: function (Model $model): void {
            $model->business_id    = generateUniqueCode();
        });

    }

    /**
     * Summary of business
     * @return BelongsTo
     */
    public function business(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Summary of locations
     * @return HasMany
     */
    public function locations(): HasMany{
        return $this->hasMany(BusinessLocation::class, 'bo_id', 'user_id');
    }

    /**
     * Summary of category
     * @return BelongsTo
     */
    public function category(): BelongsTo{
        return $this->belongsTo(Category::class, 'bo_category_id');
    }

    /**
     * Summary of language
     * @return BelongsTo
     */
    public function language(): BelongsTo{
        return $this->belongsTo(Setting::class, 'language_id');
    }

    /**
     * Summary of currency
     * @return BelongsTo
     */
    public function currency(): BelongsTo{
        return $this->belongsTo(Setting::class, 'currency_id');
    }
}
