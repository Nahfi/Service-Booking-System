<?php

namespace App\Models;

use App\Enums\Common\TaskStatus;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskLog extends Model
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
    public function taskAssignment(): BelongsTo
    {
        return $this->belongsTo(TaskAssignment::class, "task_assignment_id", "id");
    }

    /**
     * file
     *
     * @return MorphOne
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }
}

