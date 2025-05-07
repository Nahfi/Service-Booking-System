<?php

namespace App\Models;

use App\Enums\Common\ShiftRequestStatus;
use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use App\Enums\Common\ShiftStatus;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class ShiftRequest extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * scopePending
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePending(Builder $q): Builder{
        
        return $q->where('status', ShiftRequestStatus::PENDING);
    }

    /**
     * scopeApproved
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeApproved(Builder $q): Builder{

        return $q->where('status', ShiftRequestStatus::APPROVED);
    }

    /**
     * scopeRejected
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRejected(Builder $q): Builder{

        return $q->where('status', ShiftRequestStatus::REJECTED);
    }

    /**
     * scopeExpired
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeExpired(Builder $q): Builder{

        return $q->where('status', ShiftRequestStatus::EXPIRED);
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
     * employee
     *
     * @return BelongsTo
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id', 'id');
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

    /**
     * openShift
     *
     * @return BelongsTo
     */
    public function openShift(): BelongsTo
    {
        return $this->belongsTo(OpenShift::class, 'open_shift_id', 'id');
    }
}
