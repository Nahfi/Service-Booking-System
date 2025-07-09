<?php

namespace Modules\SmsMessaging\Models;

use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Models\Scopes\UserScope;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SmsProviderDevice extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    //Model Configuration
    protected $guarded = [];

    protected $casts = [
        'meta_data'         => 'array',
        'last_active_at'    => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {

            $model->uid = Str::uuid();
        });
    }


    //Model Relations

    /**
     * smsProvider
     *
     * @return BelongsTo
     */
    public function smsProvider(): BelongsTo{
        return $this->belongsTo(SmsProvider::class);
    }

    /**
     * smsGateways
     *
     * @return HasMany
     */
    public function smsGateways(): HasMany{
        return $this->hasMany(SmsGateway::class, 'sms_provider_device_id');
    }

    /**
     * scopeActive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return  $q->where('status',Status::ACTIVE->value);
    }
}
