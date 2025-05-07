<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use App\Enums\Common\ShiftStatus;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

class OpenShift extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    // protected $appends = [
    //     'total_companies_by_date',
    //     'total_departments_by_date',
    //     'total_shifts_by_date',
    //     'total_employees_by_date'
    // ];

    /**
     * casts
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'generated_at'          => 'datetime',
            'published_at'          => 'datetime',
            'bonus_configuration'   => 'object',
            'meta_data'             => 'object'
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
     * scopePublished
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePublished(Builder $q): Builder{
        return $q->where('is_published', true);
    }

    /**
     * scopeUnpublished
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeUnpublished(Builder $q): Builder{
        return $q->where('is_published', false);
    }

    /**
     * scopePending
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePending(Builder $q): Builder{
        return $q->where('shift_status', ShiftStatus::PENDING);
    }

    /**
     * scopeCancel
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeCancel(Builder $q): Builder{
        return $q->where('shift_status', ShiftStatus::CANCEL);
    }

    /**
     * scopeAccepted
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeAccepted(Builder $q): Builder{
        return $q->where('shift_status', ShiftStatus::ACCEPTED);
    }

    /**
     * scopeCompleted
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeCompleted(Builder $q): Builder{
        return $q->where('shift_status', ShiftStatus::COMPLETED);
    }

    /**
     * scopeExpired
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeExpired(Builder $q): Builder{
        return $q->where('shift_status', ShiftStatus::EXPIRED);
    }

    /**
     * scopeNotExpired
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeNotExpired(Builder $q): Builder{
        return $q->where('shift_status', '!=', ShiftStatus::EXPIRED);
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
     * department
     *
     * @return BelongsTo
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department_id', 'id');
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
     * currency
     *
     * @return BelongsTo
     */
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Setting::class, 'currency_id', 'id');
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
     * company
     *
     * @return BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    /**
     * Summary of scopeCustomFilter
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCustomFilter(Builder $query): Builder
    {

        $shifts = request()->input('shift_setting_ids');

        $filterAbleShift = !is_array($shifts) 
                                ? explode(",",$shifts)
                                : $shifts;


        $departments = request()->input('department_ids');

        $filterAbleDepartments = !is_array($departments) 
                                        ? explode(",",$departments)
                                        : $departments;

        $company_ids         = request()->input('company_ids');

        $filterAbleCompanies = !is_array($company_ids) 
                                        ? explode(",",$company_ids)
                                        : $company_ids;

        return $query->when(request()->input('shift_setting_ids') , 
        fn(Builder $q): Builder => $q->whereIn('shift_setting_id',
        $filterAbleShift))
        ->when(request()->input('company_ids') , 
        fn(Builder $q): Builder => $q->whereIn('company_id',$filterAbleCompanies ))
        ->when(request()->input('department_ids') , 
        fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments ));
  
    }

    /**
     * scopeExportFilter
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeExportFilter(Builder $query): Builder
    {

        $shifts = request()->input('shift_setting_ids');

        $filterAbleShift = !is_array($shifts) 
                                ? explode(",",$shifts)
                                : $shifts;


        $departments = request()->input('department_ids');

        $filterAbleDepartments = !is_array($departments) 
                                        ? explode(",",$departments)
                                        : $departments;


        $employees = request()->input('employee_ids');

        $filterAbleEmployees = !is_array($employees) 
                                        ? explode(",",$employees)
                                        : $employees;


        $types = request()->input('employee_job_types');
        
        $filterTypes = !is_array($types) 
                                        ? explode(",",$types)
                                        : $types;           


        
                                        
        $company_ids         = request()->input('company_ids');

        $filterAbleCompanies = !is_array($company_ids) 
                                        ? explode(",",$company_ids)
                                        : $company_ids;

                                        
        
        return $query->when(request()->input('shift_setting_ids') , 
        fn(Builder $q): Builder => $q->whereIn('shift_setting_id',
        $filterAbleShift))
      
        ->when(request()->input('department_ids') , 
        fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments ))
        ->when(request()->input('company_ids') , 
        fn(Builder $q): Builder => $q->whereIn('company_id',$filterAbleCompanies ))


        ->when(request()->input('employee_ids'), 
        fn(Builder $q): Builder => $q->whereIn('employee_id',$filterAbleEmployees))
        ->when(request()->input('employee_job_types'), function (Builder $q) use ($filterTypes) {
            return $q->whereHas('employee', function (Builder $q) use ($filterTypes) {
                $q->whereIn('employee_job_type', $filterTypes);
            });
        });
  
    }

    public function scopeGenerateFilter(Builder $query): Builder
    {

        $shifts = request()->input('shift_setting_ids');

        $filterAbleShift = !is_array($shifts) 
                                ? explode(",",$shifts)
                                : $shifts;


        $departments = request()->input('department_ids');

        $filterAbleDepartments = !is_array($departments) 
                                        ? explode(",",$departments)
                                        : $departments;

                                        
        
        return $query->when(request()->input('shift_setting_ids') , 
        fn(Builder $q): Builder => $q->whereIn('shift_setting_id',
        $filterAbleShift))
      
        ->when(request()->input('department_ids') , 
        fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments ));
  
    }



    /**
     * Summary of scopeCustomOpenShiftFilter
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    // public function scopeCustomOpenShiftFilter(Builder $query): Builder
    // {

    //     $shifts = request()->input('shift_setting_ids');

    //     $filterAbleShift = !is_array($shifts) 
    //                             ? explode(",",$shifts)
    //                             : $shifts;


    //     $departments = request()->input('department_ids');

    //     $filterAbleDepartments = !is_array($departments) 
    //                                     ? explode(",",$departments)
    //                                     : $departments;


    //     return $query->when(request()->input('shift_setting_ids') , 
    //     fn(Builder $q): Builder => $q->whereIn('shift_setting_id',
    //     $filterAbleShift))
      
    //     ->when(request()->input('department_ids') , 
    //     fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments));
    // }


    /**
     * getTotalCompaniesByDateAttribute
     *
     * @return int
     */
    // public function getTotalCompaniesByDateAttribute(): int
    // {
    //     return static::query()
    //         ->whereDate('generated_at', $this->generated_at)
    //         ->distinct('company_id')
    //         ->count('company_id');
    // }

    // /**
    //  * getTotalDepartmentsByDateAttribute
    //  *
    //  * @return int
    //  */
    // public function getTotalDepartmentsByDateAttribute(): int
    // {
    //     return static::query()
    //         ->whereDate('generated_at', $this->generated_at)
    //         ->distinct('department_id')
    //         ->count('department_id');
    // }

    // /**
    //  * getTotalShiftsByDateAttribute
    //  *
    //  * @return int
    //  */
    // public function getTotalShiftsByDateAttribute(): int
    // {
    //     return static::query()
    //         ->whereDate('generated_at', $this->generated_at)
    //         ->count();
    // }

    // /**
    //  * getTotalEmployeesByDateAttribute
    //  *
    //  * @return mixed
    //  */
    // public function getTotalEmployeesByDateAttribute(): mixed
    // {
    //     return static::query()
    //         ->whereDate('generated_at', $this->generated_at)
    //         ->sum('shift_count');
    // }
}
