<?php

namespace App\Models;

use App\Enums\Common\AvailabilityStatus;
use App\Enums\Common\EmployeeJobType;
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
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserAvailability extends Model
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
            'available_date' => 'datetime',
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
     * scopeAvailable
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeAvailable(Builder $q): Builder{
        return $q->where('status', AvailabilityStatus::AVAILABLE);
    }

    /**
     * scopeUnavailable
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeUnavailable(Builder $q): Builder{
        return $q->where('status', AvailabilityStatus::UNAVAILABLE);
    }

    public function scopeFullDay(Builder $q): Builder{
        return $q->where('is_full_day', true);
    }

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
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
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
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany{
        return $this->hasMany(Shift::class, 'availability_id', 'id');
    }

    /**
     * shift
     *
     * @return HasOne
     */
    public function shift(): HasOne{
        return $this->hasOne(Shift::class, 'availability_id', 'id');
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

        $employees = request()->input('employee_ids');
        $filterAbleEmployees = !is_array($employees) 
                                        ? explode(",",$employees)
                                        : $employees;

        return $query->when(request()->input('shift_setting_ids') , 
        fn(Builder $q): Builder => $q->whereIn('shift_setting_id', $filterAbleShift ))
        ->when(request()->input('employee_ids'), 
        fn(Builder $q): Builder => $q->whereIn('user_id',$filterAbleEmployees ));
    }





    /**
     * Summary of scopeShiftGenerateFilter
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return Builder
     */
    public function scopeShiftGenerateFilter(Builder $query): Builder
    {


            $departments = request()->input('department_ids');
            
            $filterAbleDepartments = !is_array($departments) 
                                                ? explode(",",$departments)
                                                : $departments;

            $companyIds         = request()->input('company_ids');

            $filterAbleCompanies = !is_array($companyIds) 
                                            ? explode(",",$companyIds)
                                            : $companyIds;
            $types = request()->input('employee_job_types');

            $filterTypes = !is_array($types) 
                                            ? explode(",",$types)
                                            : $types;
            $employees = request()->input('employee_ids');

            $filterAbleEmployees = !is_array($employees) 
                                            ? explode(",",$employees)
                                            : $employees;



            $shifts = request()->input('shift_setting_ids');

            $filterAbleShift = !is_array($shifts) 
                                    ? explode(",",$shifts)
                                    : $shifts;
            


            return $query->when($departments , 
                                fn(Builder $q): Builder => $q->whereHas('user.wages' , fn(Builder  $query):Builder => 
                                    $query->whereIn('department_id',$filterAbleDepartments)
                            ))
                            ->when(
                                $types , fn(Builder $q): Builder => $q->whereHas('user' , fn(Builder  $query):Builder  => 
                                $query->whereIn('employee_job_type',$filterTypes)
                            ))
                            ->when($companyIds   , 
                                fn(Builder $q): Builder => $q->whereHas('user.companies' , fn(Builder  $query):Builder => 
                                    $query->whereIn('company_id',$filterAbleCompanies)
                            ))
                            ->when(request()->input('is_full_day'),function (Builder $q): Builder {
                                return $q->where('is_full_day',true);
                            })
                            ->when($shifts , 
                   fn(Builder $q): Builder => $q->whereIn('shift_setting_id', $filterAbleShift ))
                            ->when($employees , 
                                fn(Builder $q): Builder => $q->whereHas('user' , fn(Builder  $query):Builder => 
                                    $query->whereIn('user_id',$filterAbleEmployees)
                            ));




    }



    /**
     * Scope to order by job type priority.
     *
     * @param Builder $query
     * @return Builder
     */
    public function scopeOrderByJobTypePriority(Builder $query): Builder
    {
        $priorityOrder = EmployeeJobType::getPriorityOrder();
        
        $priorityCase = "CASE users.employee_job_type ";
        foreach ($priorityOrder as $index => $type) {
            $priorityCase .= "WHEN '$type' THEN $index ";
        }
        $priorityCase .= "ELSE " . count($priorityOrder) . " END";

        return $query
            ->join('users', 'user_availabilities.user_id', '=', 'users.id')
            ->leftJoin('payroll_presets', 'payroll_presets.id', '=', 'users.preset_id') 
            ->orderByRaw($priorityCase)
            ->orderByRaw('users.preset_id IS NULL')
            ->when(
                \DB::raw('payroll_presets.id IS NOT NULL'), 
                function ($query) {
                    $query->orderBy('payroll_presets.wage', 'ASC');
                }
            )
            ->select( 'user_availabilities.*');
    }



  

}
