<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class ShiftSetting extends Model
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
    // public function asTime($value): Carbon
    // {
    //     $user = getAuthUser('user:api', ['businessSetting', 'business.businessSetting']); 
    //     dd($user);
    //     $business = getBusiness($user);
    //     $timezone = $business?->businessSetting?->time_zone ?? 'UTC';
    //     return Carbon::parse($value)->setTimezone($timezone);
    // }
    
    /**
     * scopeActive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status', Status::ACTIVE);
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
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany {
        return $this->hasMany(Shift::class, 'shift_setting_id', 'id')->latest();
    }

    /**
     * openShifts
     *
     * @return HasMany
     */
    public function openShifts(): HasMany {
        return $this->hasMany(OpenShift::class, 'shift_setting_id', 'id')->latest();
    }

    /**
     * availabilities
     *
     * @return HasMany
     */
    public function availabilities(): HasMany {
        return $this->hasMany(UserAvailability::class, 'shift_setting_id', 'id')->latest();
    }

    /**
     * userShift
     *
     * @return HasOne
     */
    public function userShift(): HasOne {
        return $this->hasOne(Shift::class, 'shift_setting_id', 'id')->latest();
    }


    /**
     * company
     *
     * @return BelongsTo
     */
    public function company(): HasOneThrough
    {
        return $this->hasOneThrough(
            Company::class,                
            CompanyShiftSetting::class,    
            'shift_setting_id',            
            'id',                         
            'id',                          
            'company_id'                    
        );
    }

    /**
     * companyShiftSettings
     *
     * @return HasMany
     */
    public function companyShiftSettings(): HasMany
    {
        return $this->hasMany(CompanyShiftSetting::class, 'shift_setting_id');
    }
}
