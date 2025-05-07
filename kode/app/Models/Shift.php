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

class Shift extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

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
            'no_show_configuration' => 'object',
            'meta_data'             => 'object'
        ];
    }

    // public function asDateTime($value)
    // {
    //     $user = getAuthUser('user:api', ['businessSetting', 'business.businessSetting']); 
    //     $business = getBusiness($user);
    //     $timeZone = $business?->businessSetting?->time_zone ?? 'UTC';
    //     return Carbon::parse($value)->setTimezone($timezone);
    // }

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
     * scopeBackup
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeBackup(Builder $q): Builder{
        return $q->where('is_backup', true);
    }

    /**
     * scopeOpen
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeOpen(Builder $q): Builder{
        return $q->where('is_open', true);
    }


  
    /**
     * Summary of scopeClose
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeClose(Builder $q): Builder{
        return $q->where('is_open', false);
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
     * openShift
     *
     * @return BelongsTo
     */
    public function openShift(): BelongsTo
    {
        return $this->belongsTo(OpenShift::class, 'open_shift_id', 'id');
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
     * employees
     *
     * @return HasMany
     */
    public function employees(): HasMany
    {
        return $this->hasMany(User::class, 'employee_id', 'id');
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
     * forwardedTo
     *
     * @return BelongsTo
     */
    public function forwardedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'forwarded_to', 'id');
    }

    /**
     * forwardedBy
     *
     * @return BelongsTo
     */
    public function forwardedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'forwarded_by', 'id');
    }

    /**
     * task
     *
     * @return BelongsTo
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'task_id', 'id');
    }

    /**
     * Get all tasks for this shift through task assignments
     *
     * @return HasManyThrough
     */
    public function tasks(): HasManyThrough
    {
        return $this->hasManyThrough(
            Task::class,     
            TaskAssignment::class,
            'shift_id',        
            'id',             
            'id',              
            'task_id'    
        );
    }

    /**
     * availability
     *
     * @return BelongsTo
     */
    public function availability(): BelongsTo
    {
        return $this->belongsTo(UserAvailability::class, 'availability_id', 'id');
    }

    /**
     * shiftLogs
     *
     * @return HasMany
     */
    public function shiftLogs(): HasMany
    {
        return $this->hasMany(ShiftLog::class, 'shift_id', 'id');
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
     * parent
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Shift::class, 'parent_id', 'id');
    }

    /**
     * children
     *
     * @return HasMany
     */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id', 'id');
    }

    /**
     * attendanceRecord
     *
     * @return HasOne
     */
    public function attendanceRecord(): HasOne {
        return $this->hasOne(AttendanceRecord::class, "shift_id", "id");
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


        ->when(request()->input('employee_ids') , 
        fn(Builder $q): Builder => $q->whereIn('employee_id',$filterAbleEmployees))
        ->when(request()->input('employee_job_types') , 
        fn(Builder $q): Builder => $q->with('employees' , fn(HasMany  $q): HasMany  => 

             $q->whereIn('employee_job_type', $filterTypes)
        )->where('is_open',false) );
  
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


        // $employees = request()->input('employee_ids');

        // $filterAbleEmployees = !is_array($employees) 
        //                                 ? explode(",",$employees)
        //                                 : $employees;


        // $types = request()->input('employee_job_types');
        
        // $filterTypes = !is_array($types) 
        //                                 ? explode(",",$types)
        //                                 : $types;           
                                        
        // $company_ids         = request()->input('company_ids');

        // $filterAbleCompanies = !is_array($company_ids) 
        //                                 ? explode(",",$company_ids)
        //                                 : $company_ids;

                                        
        
        return $query->when(request()->input('shift_setting_ids') , 
        fn(Builder $q): Builder => $q->whereIn('shift_setting_id',
        $filterAbleShift))
      
        ->when(request()->input('department_ids') , 
        fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments ));
        // ->when(request()->input('company_ids') , 
        // fn(Builder $q): Builder => $q->whereIn('company_id',$filterAbleCompanies ))


        // ->when(request()->input('employee_ids'), 
        // fn(Builder $q): Builder => $q->whereIn('employee_id',$filterAbleEmployees))
        // ->when(request()->input('employee_job_types'), function (Builder $q) use ($filterTypes) {
        //     return $q->whereHas('employee', function (Builder $q) use ($filterTypes) {
        //         $q->whereIn('employee_job_type', $filterTypes);
        //     });
        // });
  
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
    public function scopeCustomOpenShiftFilter(Builder $query): Builder
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
        fn(Builder $q): Builder => $q->whereIn('department_id',$filterAbleDepartments));
    }

    /**
     * scopeCustomDeleteFilter
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeCustomDeleteFilter(Builder $query): Builder
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


        ->when(request()->input('employee_ids') , 
        fn(Builder $q): Builder => $q->whereIn('employee_id',$filterAbleEmployees))
        ->when(request()->input('employee_job_types') , 
        fn(Builder $q): Builder => $q->with('employees' , fn(HasMany  $q): HasMany  => 

             $q->whereIn('employee_job_type', $filterTypes)
        )->where('is_open',false) );
  
    }
}
