<?php

namespace App\Models;

use App\Enums\Common\DisputeStatus;
use App\Enums\Common\LeaveStatus;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class LeaveRequest extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'start_date'    => 'datetime',
            'end_date'      => 'datetime',
        ];
    }
    
    /**
     * scopePending
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePending(Builder $q): Builder{
        return $q->where('status', LeaveStatus::PENDING);
    }
    /**
     * scopeApproved
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeApproved(Builder $q): Builder{
        return $q->where('status', LeaveStatus::APPROVED);
    }
    /**
     * scopeRejected
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRejected(Builder $q): Builder{
        return $q->where('status', LeaveStatus::REJECTED);
    }

    /**
     * scopePaid
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePaid(Builder $q): Builder{
        return $q->where('is_paid',true);
    }

    /**
     * scopeUnpaid
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeUnpaid(Builder $q): Builder{
        return $q->where('is_paid',false);
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
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    /**
     * leaveType
     *
     * @return BelongsTo
     */
    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class, 'leave_type_id', 'id');
    }

     /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
