<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class DepartmentGroup extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    
    
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
     * departments
     *
     * @return BelongsToMany
     */
    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'group_departments', 'group_department_id', 'department_id');
    }

    /**
     * manager
     *
     * @return BelongsTo
     */
    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    /**
     * groupDepartments
     *
     * @return HasMany
     */
    public function groupDepartments(): HasMany
    {
        return $this->hasMany(GroupDepartment::class, 'group_department_id');
    }




    /**
     * Summary of groupMessages
     * @return HasMany<GroupMessage, DepartmentGroup>
     */
    public function groupMessages(): HasMany
    {
        return $this->hasMany(GroupMessage::class, 'group_id');
    }




    /**
     * Summary of blockedGroupUsers
     * @return BelongsTo<DepartmentGroup, DepartmentGroup>
     */
    public function blockedGroupUsers(): HasMany
    {
        return $this->hasMany(BlockedGroupUser::class, 'group_id');
    }




    /**
     * Summary of lastestGroupMessage
     * @return HasOne<GroupMessage, DepartmentGroup>
     */
    public function lastestGroupMessage(): HasOne
    {
        return $this->hasOne(GroupMessage::class, 'group_id')
                     ->latest();
    }




}
