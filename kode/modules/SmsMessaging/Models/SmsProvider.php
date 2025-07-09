<?php

namespace Modules\SmsMessaging\Models;

use App\Enums\Common\Status;
use App\Models\User;
use Illuminate\Support\Str;
use App\Models\Scopes\UserScope;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SmsProvider extends Model
{
    use HasFactory, HasApiTokens, Filterable, SoftDeletes;

    //Model Configuration
    protected $table = 'sms_providers';
    protected $guarded = [];

    protected $casts = [
        'configuration'         => 'array',
        'device_information'    => 'array',
        'last_active_time'      => 'datetime',
    ];

    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);
        static::creating(callback: function (Model $model): void {

            $parentUser = parent_user();
            $model->uid = Str::uuid();
            if($parentUser) $model->user_id = parent_user()->id;
        });
    }


    //Model Relations

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    /**
     * smsGateways
     *
     * @return HasMany
     */
    public function smsGateways(): HasMany{
        return $this->hasMany(SmsGateway::class, 'sms_provider_id');
    }

    /**
     * devices
     *
     * @return HasMany
     */
    public function devices(): HasMany
    {
        return $this->hasMany(SmsProviderDevice::class);
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
