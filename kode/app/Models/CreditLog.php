<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Enums\Common\CreditType;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\Common\ResourceAllocationType;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CreditLog extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }

    /**
     * scopeEmployee
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeEmployee(Builder $q): Builder
    {
        return $q->where('type', ResourceAllocationType::EMPLOYEE);
    }

    /**
     * scopeLocation
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeLocation(Builder $q): Builder
    {
        return $q->where('type', ResourceAllocationType::LOCATION);
    }

    /**
     * scopePlus
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePlus(Builder $q): Builder
    {
        return $q->where('credit_type', CreditType::PLUS);
    }

    /**
     * scopeMinus
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeMinus(Builder $q): Builder
    {
        return $q->where('credit_type', CreditType::MINUS);
    }

    /**
     * subscription
     *
     * @return BelongsTo
     */
    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class, 'subscription_id', 'id');
    }

    /**
     * business
     *
     * @return BelongsTo
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bo_id', 'id');
    }
}
