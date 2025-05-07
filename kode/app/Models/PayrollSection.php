<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Enums\Common\PayslipColumn;
use App\Enums\Common\PayslipSection;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class PayrollSection extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    protected $guarded = [];

    /**
     * scopeSalaryBreakdown
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeSalaryBreakdown(Builder $q): Builder{
        return $q->where('type', PayslipSection::SALARY_BREAKDOWN);
    }

    /**
     * scopeSectionA
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeSectionA(Builder $q): Builder{
        return $q->where('payslip_column', PayslipColumn::A);
    }

    /**
     * scopeSectionB
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeSectionB(Builder $q): Builder{
        return $q->where('payslip_column', PayslipColumn::B);
    }

    /**
     * scopeSectionC
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeSectionC(Builder $q): Builder{
        return $q->where('payslip_column', PayslipColumn::C);
    }

    /**
     * scopeSectionD
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeSectionD(Builder $q): Builder{
        return $q->where('payslip_column', PayslipColumn::D);
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
     * scopeInactive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeInactive(Builder $q): Builder{
        return $q->where('status', Status::INACTIVE);
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
     * scopeDynamic
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeDynamic(Builder $q): Builder{
        return $q->where('is_dynamic', true);
    }
    /**
     * section_column
     *
     * @return BelongsTo
     */
    public function section_column(): BelongsTo
    {
        return $this->belongsTo(PayrollSectionColumn::class, 'payroll_section_column_id');
    }
}
