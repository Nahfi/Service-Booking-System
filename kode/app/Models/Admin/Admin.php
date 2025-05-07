<?php

namespace App\Models\Admin;

use App\Enums\Common\Status;
use App\Models\AffiliateCommissionLog;
use App\Models\AffiliateInvoice;
use App\Models\File;
use App\Models\Otp;
use App\Models\Role;
use App\Models\User;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Admin extends Authenticatable
{




    use HasApiTokens, HasFactory, Notifiable, Filterable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google2fa_secret',
        'affiliate_configuration',
        'address',
    ];






    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
    ];

    
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'last_login_time'         => 'datetime',
            'affiliate_configuration' => 'object',
            'address'                 => 'object',
        ];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void{
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });

    }

    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status',Status::ACTIVE);
    }
    
    /**
     * scopeInactive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeInactive(Builder $q): Builder{
        return $q->where('status',Status::INACTIVE);
    }

    /**
     * Summary of scopeSuperAdmin
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSuperAdmin(Builder $q): Builder{
        return $q->where('is_affiliate_user',false);
    }

    /**
     * Summary of scopeAffiliateUser
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAffiliateUser(Builder $q): Builder{
        return $q->where('is_affiliate_user',true);
    }


   

    /**
     * Summary of scopeAdminUser
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeAdminUser(Builder $q): Builder{
        return $q->where('is_affiliate_user',false)
                    ->whereNotNull('role_id');
    }

    /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }

    /**
     * Summary of otp
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function otp() :MorphMany{
        return $this->morphMany(Otp::class, 'otpable');
    }

    /**
     * invoices
     *
     * @return HasMany
     */
    public function invoices(): HasMany
    {
        return $this->hasMany(AffiliateInvoice::class, 'affiliate_admin_id');
    }

    
    /**
     * Summary of latestInvoice
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function latestInvoice(): HasOne
    {
        return $this->hasOne(AffiliateInvoice::class, 'affiliate_admin_id')->latest();
    }

    /**
     * commissionLogs
     *
     * @return HasMany
     */
    public function affiliateCommissionLogs(): HasMany
    {
        return $this->hasMany(AffiliateCommissionLog::class, 'affiliate_admin_id');
    }

    /**
     * Summary of oldestCommission
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function oldestCommission(): HasOne
    {
        return $this->hasOne(AffiliateCommissionLog::class, 'affiliate_admin_id')
                      ->oldest();
    }

    /**
     * users
     *
     * @return HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'affiliate_admin_id', 'id');
    }






    /**
     * Summary of role
     * @return BelongsTo<Role, Admin>
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

}
