<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * business
     *
     * @return BelongsTo
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bo_id');
    }

    /**
     * location
     *
     * @return BelongsTo
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(BusinessLocation::class, 'location_id');
    }

    /**
     * shiftSetting
     *
     * @return BelongsTo
     */
    public function shiftSetting(): BelongsTo
    {
        return $this->belongsTo(ShiftSetting::class, 'shift_setting_id');
    }



    /**
     * shiftTasks
     *
     * @return HasMany
     */
    public function shiftTasks(): HasMany
    {
        return $this->hasMany(TaskAssignment::class, "shift_id", "id");
    }

    /**
     * taskAssignment
     *
     * @return HasMany
     */
    public function taskAssignments(): HasMany
    {
        return $this->hasMany(TaskAssignment::class, "task_id", "id");
    }

    /**
     * taskAssignment
     *
     * @return HasOne
     */
    public function taskAssignment(): HasOne
    {
        return $this->hasOne(TaskAssignment::class, "task_id", "id");
    }
}
