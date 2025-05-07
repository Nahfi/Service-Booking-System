<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PayrollDeduction extends Model
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
            'employee_conditions' => 'object',
            'business_conditions' => 'object',
        ];
    }
    
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
     * scopeDefault
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeDefault(Builder $q): Builder{
        return $q->where('is_default', true);
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
     * userPayrollDeduction
     *
     * @return HasMany
     */
    public function userPayrollAllowances(): HasMany
    {
        return $this->hasMany(UserPayrollDeduction::class, 'payroll_deduction_id', 'id');
    }

    public function preset(): BelongsTo
    {
        return $this->belongsTo(PayrollPreset::class, 'preset_id');
    }

}
