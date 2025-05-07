<?php

namespace App\Models;

use App\Enums\Common\TaskStatus;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskAssignment extends Model
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
        return $q->where('status', TaskStatus::PENDING);
    }

    /**
     * scopeAssigned
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeAssigned(Builder $q): Builder{
        return $q->where('status', TaskStatus::ASSIGNED);
    }

    /**
     * scopeUnassigned
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeUnassigned(Builder $q): Builder{
        return $q->where('status', TaskStatus::UNASSIGNED);
    }

    /**
     * scopeRequested
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRequested(Builder $q): Builder{
        return $q->where('status', TaskStatus::REQUESTED);
    }

    /**
     * scopeCompleted
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeCompleted(Builder $q): Builder{
        return $q->where('status', TaskStatus::COMPLETED);
    }

    /**
     * scopeRejected
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRejected(Builder $q): Builder{
        return $q->where('status', TaskStatus::REJECTED);
    }

    /**
     * task
     *
     * @return BelongsTo
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, "task_id", "id");
    }

    /**
     * shift
     *
     * @return BelongsTo
     */
    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class, "shift_id", "id");
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "employee_id", "id");
    }

    /**
     * taskLog
     *
     * @return HasMany
     */
    public function taskLog(): HasMany
    {
        return $this->hasMany(TaskLog::class, "task_assignment_id", 'id');
    }
}
