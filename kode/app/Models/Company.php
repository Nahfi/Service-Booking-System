<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Company extends Model
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
        return [
            'date' => 'datetime',
            'address'   => 'object',
            'meta_data' => 'object',
            'contact_person_info' => 'object',
        ];
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
     * departments
     *
     * @return HasManyThrough
     */
    public function departments(): HasManyThrough
    {
        return $this->hasManyThrough(
            Department::class,          
            CompanyDepartment::class,   
            'company_id',               
            'id',                      
            'id',                      
            'department_id'            
        );
    }

    /**
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class, 'company_id', 'id');
    }

    /**
     * openShifts
     *
     * @return HasMany
     */
    public function openShifts(): HasMany
    {
        return $this->hasMany(OpenShift::class, 'company_id', 'id');
    }

    /**
     * companyDepartments
     *
     * @return HasMany
     */
    public function companyDepartments(): HasMany
    {
        return $this->hasMany(CompanyDepartment::class, 'company_id', 'id');
    }

    /**
     * companyShiftSettings
     *
     * @return HasMany
     */
    public function companyShiftSettings(): HasMany
    {
        return $this->hasMany(CompanyShiftSetting::class, 'company_id', 'id');
    }
    /**
     * employeeCompanies
     *
     * @return HasMany
     */
    public function employeeCompanies(): HasMany
    {
        return $this->hasMany(EmployeeCompany::class, 'company_id', 'id');
    }

    /**
     * location
     *
     * @return BelongsTo
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(BusinessLocation::class, 'location_id', 'id');
    }

    /**
     * accessPoints
     *
     * @return HasMany
     */
    public function accessPoints(): HasMany
    {
        return $this->hasMany(AccessPointWhiteList::class, 'company_id', 'id');
    }
}
