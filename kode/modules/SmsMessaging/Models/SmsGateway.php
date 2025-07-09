<?php

namespace Modules\SmsMessaging\Models;

use Illuminate\Support\Str;
use App\Models\Scopes\UserScope;
use App\Models\User;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SmsGateway extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    //Model Configuration
    protected $guarded = [];

    protected $casts = [
        'credentials'   => 'array',
        'configuration' => 'array',
        'rate_limit'    => 'array'
    ];

    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
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
     * smsProvider
     *
     * @return BelongsTo
     */
    public function smsProvider(): BelongsTo{

        return $this->belongsTo(SmsProvider::class);
    }

    /**
     * smsProviderDevice
     *
     * @return BelongsTo
     */
    public function smsProviderDevice(): BelongsTo{

        return $this->belongsTo(SmsProviderDevice::class, "sms_provider_device_id", "id");
    }
}
