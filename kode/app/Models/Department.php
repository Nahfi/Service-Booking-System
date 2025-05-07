<?php

namespace App\Models;

use Illuminate\Support\Str;
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
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Department extends Model
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
        return ['wages' => 'object'];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
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
     * wages
     *
     * @return HasMany
     */
    public function wages(): HasMany
    {
        return $this->hasMany(Wage::class, 'department_id', 'id');
    }

    /**
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany {

        return $this->hasMany(Shift::class, 'department_id', 'id');
    }
    
    /**
     * groupDepartments
     *
     * @return BelongsToMany
     */
    public function groupDepartments(): BelongsToMany
    {
        return $this->belongsToMany(DepartmentGroup::class, 'group_departments', 'department_id', 'group_department_id');
    }

    /**
     * company
     *
     * @return HasOneThrough
     */
    public function company(): HasOneThrough
    {
        return $this->hasOneThrough(
            Company::class,
            CompanyDepartment::class,
            'department_id',
            'id',
            'id',
            'company_id'
        );
    }

     /**
     * companyDepartments
     *
     * @return HasMany
     */
    public function companyDepartments(): HasMany
    {
        return $this->hasMany(CompanyDepartment::class, 'department_id');
    }

    /**
     * employees
     *
     * @return HasManyThrough
     */
    public function employees(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, Wage::class, 'department_id', 'id', 'id', 'employee_id');
    }
}
