<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupDepartment extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    
    public function Department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function groupDepartment(): BelongsTo
    {
        return $this->belongsTo(DepartmentGroup::class, 'group_department_id');
    }
}
