<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyShiftSetting extends Model
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
            'date' => 'datetime',
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
     * company
     *
     * @return BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    /**
     * department
     *
     * @return BelongsTo
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    /**
     * shiftSetting
     *
     * @return BelongsTo
     */
    public function shiftSetting(): BelongsTo
    {
        return $this->belongsTo(ShiftSetting::class, 'shift_setting_id', 'id');
    }
}
