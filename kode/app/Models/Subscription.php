<?php

namespace App\Models;

use App\Enums\Common\PaymentStatus;
use App\Models\Admin\Admin;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use App\Enums\Common\SubscriptionType;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Common\SubscriptionStatus;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subscription extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'employee_allocation'          => 'object',
            'location_allocation'          => 'object',
            'feature_allocation'           => 'object',
            'custom_subscription_feature'  => 'object',
        ];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
            $model->invoice_number = generate_invoice_number();
        });
    }

    /**
     * scopeMonthly
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeMonthly(Builder $q): Builder
    {
        return $q->where('type', SubscriptionType::MONTHLY);
    }

    /**
     * scopeYearly
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeYearly(Builder $q): Builder
    {
        return $q->where('type', SubscriptionType::YEARLY);
    }

    /**
     * system
     *
     * @return BelongsTo
     */
    public function system(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'id');
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
     * plan
     *
     * @return BelongsTo
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(PricingPlan::class, 'plan_id', 'id');
    }


    /**
     * Summary of creditLogs
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function creditLogs(): HasMany
    {
        return $this->hasMany(CreditLog::class, 'subscription_id', 'id');
    }



    /**
     * Summary of payment
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function payment():BelongsTo {
        return $this->belongsTo(PaymentLog::class, 'payment_id', 'id');
    }


     /**
     * Summary of payment
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function paymentGateway():BelongsTo {
        return $this->belongsTo(PaymentLog::class, 'payment_gateway_id', 'id');
    }
    

    

    /**
     * scopeRunning
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRunning(Builder $q) :Builder {
        
        return $q->where("status", SubscriptionStatus::RUNNING);
    }




    /**
     * Summary of scopeUnpaid
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUnpaid(Builder $q) :Builder {
        
        return $q->where("payment_status", PaymentStatus::INITIATE);
    }




    /**
     * Summary of scopePayLater
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePayLater(Builder $q) :Builder {
        
        return $q->where("pay_later", TRUE);
    }


    



    

}
