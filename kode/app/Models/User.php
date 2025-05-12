<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\Settings\SettingKey;
use App\Traits\Subscriptionable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\Setting\Models\Setting;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Filterable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password'          => 'hashed',
            'address'           => 'object',
            'meta_data'         => 'object',
            'last_login_time'   => 'datetime',
            'email_verified_at' => 'datetime'
        
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
        });
    }



    /**
     * Summary of parent
     * @return BelongsTo<User, User>
     */
    public function parent():BelongsTo{
        return $this->belongsTo(SELF::class,'parent_id');
    }



    /**
     * Summary of settings
     * @return HasMany<Setting, User>
     */
    public function settings(): HasMany{
         return $this->hasMany(Setting::class,'user_id'); 
    }
    
}
