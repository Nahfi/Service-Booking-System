<?php

namespace App\Models;

use App\Models\Admin\Admin;
use Illuminate\Support\Str;
use App\Enums\Common\CreditType;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TransactionLog extends Model
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
     * system
     *
     * @return BelongsTo
     */
    public function affiliateAdmin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'affiliate_admin_id', 'id');
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

    /**
     * Summary of currency
     * @return HasOne
     */
    public function currency(): HasOne{
        return $this->hasOne(Setting::class, 'id', 'currency_id');
    }

    /**
     * paymentLog
     *
     * @return BelongsTo
     */
    public function paymentLog(): BelongsTo{
        return $this->belongsTo(PaymentLog::class, 'payment_id', 'id');
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
}
