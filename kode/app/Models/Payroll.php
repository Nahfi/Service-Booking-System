<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Payroll extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * casts
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'access_point_data'     => 'object',
            'allowance_data'        => 'object',
            'extra_earning_data'    => 'object',
            'deduction_data'        => 'object',
            'custom_deduction'        => 'object',
            'requested_data'        => 'object',
            'tax_configuration'     => 'object',
            'payroll_data'          => 'object',
            'due_date'              => 'datetime',
        ];
    }

    /**
     * scopeLate
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeLate(Builder $q): Builder{
        return $q->where('is_late', true);
    }

    /**
     * scopeEmployee
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeEmployee(Builder $q): Builder{
        return $q->where('is_employee', true);
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
     * accessPoint
     *
     * @return BelongsTo
     */
    public function accessPoint(): BelongsTo
    {
        return $this->belongsTo(AccessPointWhiteList::class, 'access_point_id', 'id');
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * location
     *
     * @return BelongsTo
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(BusinessLocation::class, 'location_id', 'id');
    }



 
    /**
     * Summary of payrollPeriod
     * @return BelongsTo<PayrollPeriodPreset, Payroll>
     */
    public function payrollPeriod(): BelongsTo
    {
        return $this->belongsTo(PayrollPeriodPreset::class, 'period_id', 'id');
    }




    /**
     * shift
     *
     * @return BelongsTo
     */
    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class, 'shift_id', 'id');
    }

    /**
     * records
     *
     * @return HasMany
     */
    public function records(): HasMany
    {
        return $this->hasMany(AttendanceRecord::class, 'payroll_id', 'id');
    }

     /**
     * currency
     *
     * @return BelongsTo
     */
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Setting::class, 'currency_id', 'id');
    }
}
