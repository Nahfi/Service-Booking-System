<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Admin\Admin;
use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\Settings\SettingKey;
use App\Traits\Subscriptionable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Filterable, SoftDeletes, Subscriptionable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret'
    ];

    protected $appends = [
        'allocated_work_hours',
        'total_hours_worked'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password'          => 'hashed',
            'address'           => 'object',
            'wage'              => 'object',
            'wallet'            => 'object',
            'meta_data'         => 'object',
            'last_login_time'   => 'datetime',
            'email_verified_at' => 'datetime',
            'joined_at'         => 'datetime',
            'date_of_birth'         => 'datetime',
            'access_department'     => 'array',
            'current_location'      => 'object',
        ];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
 

        static::addGlobalScope('autoload', function (Builder $builder) {

            $builder->with(['businessSetting','file']);
        });

        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }

    ## Appends

    /**
     * getTotalWorkHoursAttribute
     *
     * @return mixed
     */
    public function getAllocatedWorkHoursAttribute(): mixed
    {
        try {
            $instance = new self();
            $business = $this->business;
            $business = $business->load(['runningSubscription']);
            if(!$this->relationLoaded('preset')) return 0;
            $runningSubscription = $business?->runningSubscription;
            $preset = $this?->preset; 
            $weeklyWorkHour = (double)business_site_settings($business, SettingKey::DEFAULT_WEEKLY_HOUR->value, 0);
            if($instance->hasPlanFeature($runningSubscription, "payroll_management")) {

                $weeklyWorkHour   = $preset 
                                        ? $preset->weekly_work_hour
                                        : $weeklyWorkHour;
            } else {
                $weeklyWorkHour   = $this->default_work_hour > 0 
                                        ? $this->default_work_hour
                                        : $weeklyWorkHour;
            }
                        
            $dateRangeString = request()->input('date');
            
            if (!$dateRangeString) return $weeklyWorkHour;
        
            $dateRangeString    = preg_replace('/\s*-\s*/', ' - ', $dateRangeString);
            $start_date         = $dateRangeString;
            $end_date           = $dateRangeString;
            
            if (strpos($dateRangeString, ' - ') !== false) 
                list($start_date, $end_date) = explode(" - ", $dateRangeString);
            

            $startDate  = Carbon::createFromFormat('m/d/Y', $start_date);
            $endDate    = Carbon::createFromFormat('m/d/Y', $end_date);

            $numberOfDays = $startDate->diffInDays($endDate) + 1;

            
                                    
            if ($numberOfDays < 1) return $weeklyWorkHour;
            

            return ($weeklyWorkHour / 7) * $numberOfDays;

        } catch (\Throwable $th) {
            return 0;
        }
    }

    /**
     * getTotalHoursWorkedAttribute
     *
     * @return float
     */
    public function getTotalHoursWorkedAttribute(): float
    {
        try {
            $dateRangeString = request()->input('date');
            if (!$dateRangeString) return 0;

            $dateRangeString = preg_replace('/\s*-\s*/', ' - ', $dateRangeString);
            $start_date = $dateRangeString;
            $end_date = $dateRangeString;
            
            if (strpos($dateRangeString, ' - ') !== false) {
                list($start_date, $end_date) = explode(" - ", $dateRangeString);
            }

            $startDate = Carbon::createFromFormat('m/d/Y', $start_date)->startOfDay();
            $endDate = Carbon::createFromFormat('m/d/Y', $end_date)->endOfDay();

            return $this->attendances()
                            ->whereHas('records', function ($query) use ($startDate, $endDate) {
                                $query->whereBetween('clock_in', [$startDate, $endDate]);
                            })
                            ->with(['records' => function ($query) use ($startDate, $endDate) {
                                $query->whereBetween('clock_in', [$startDate, $endDate]);
                            }])
                            ->get()
                            ->pluck('records')
                            ->flatten()
                            ->sum('working_hours');

        } catch (\Throwable $th) {
            return 0;
        }
    }

    ## Scope Functions 

    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive(Builder $q): Builder
    {
        return $q->where('status', Status::ACTIVE);
    }

    /**
     * scopeInactive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeInactive(Builder $q): Builder
    {
        return $q->where('status', Status::INACTIVE);
    }

    /**
     * Summary of scopeBusiness
     * @param Builder $query
     * @return Builder
     */
    public function scopeOwner(Builder $query): Builder
    {
        return $query->where('is_owner', true);
    }

    /**
     * scopeVerfied
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeVerified(Builder $query): Builder
    {
        return $query->where('is_verified', true);
    }

    /**
     * scopeEmployee
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeEmployee(Builder $q): Builder{
        return $q->where('is_owner', false);
    }

     /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCustomFilter(Builder $q): Builder
    {

        $employees = request()->input('employee_ids');

        $filterAbleEmployees = !is_array($employees) 
                                        ? explode(",",$employees)
                                        : $employees;

        $types = request()->input('employee_job_types');

        $filterTypes = !is_array($types) 
                                        ? explode(",",$types)
                                        : $types;


        $departments = request()->input('department_ids');

        $filterDepartments = !is_array($departments) 
                                        ? explode(",",$departments)
                                        : $departments;




        $company_ids         = request()->input('company_ids');

        $filterAbleCompanies = !is_array($company_ids) 
                                        ? explode(",",$company_ids)
                                        : $company_ids;

                                        

        return $q->when(
                request()->input('employee_ids') , 
            fn(Builder $q): Builder => $q->whereIn('id', $filterAbleEmployees))
            ->when(
                request()->input('employee_job_types') , 
            fn(Builder $q): Builder => $q->whereIn('employee_job_type', $filterTypes))
            ->when(
                request()->input('department_ids') , 
            fn(Builder $q): Builder => $q->whereHas('wages' , fn(Builder  $query):Builder  => 
                  $query->whereIn('department_id',$filterDepartments)

            ))
            ->when(
                request()->input('company_ids') , 
            fn(Builder $q): Builder => $q->whereHas('companies' , fn(Builder  $query):Builder  => 
                  $query->whereIn('company_id',$filterAbleCompanies)

            ));

    }

    /**
     * business
     *
     * @return BelongsTo
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id', 'id')
                         ->withoutGlobalScope('autoload');
    }

    /**
     * employees
     *
     * @return HasMany
     */
    public function employees(): HasMany
    {
        return $this->hasMany(User::class, 'parent_id', 'id')->where('is_owner', false);
    }


    /**
     * userKycLogs
     *
     * @return HasMany
     */
    public function userKycLogs(): HasMany{

        return $this->hasMany(KycLog::class, 'user_id')->latest();
    }

    /**
     * documents
     *
     * @return HasMany
     */
    public function documents(): HasMany
    {
        return $this->hasMany(BusinessDocumentTemplate::class, 'user_id', 'id')->latest();
    }

    /**
     * Summary of currency
     * @return HasOne
     */
    public function currency(): HasOne{
        return $this->hasOne(Setting::class, 'id', 'currency_id');
    }

    /**
     * companies
     *
     * @return HasManyThrough
     */
    public function companies(): HasManyThrough
    {
        return $this->hasManyThrough(
            Company::class, 
            EmployeeCompany::class, 
            'employee_id', 
            'id', 
            'id', 
            'company_id' 
        );
    }

    /**
     * userPayrollAllowances
     *
     * @return BelongsToMany
     */
    public function userPayrollAllowances(): BelongsToMany
    {
        return $this->belongsToMany(
            PayrollAllowance::class,
            'user_payroll_allowances',
            'user_id',
            'payroll_allowance_id'
        );
    }

    /**
     * userPayrollDeductions
     *
     * @return BelongsToMany
     */
    public function userPayrollDeductions(): BelongsToMany
    {
        return $this->belongsToMany(
            PayrollDeduction::class,
            'user_payroll_deductions',
            'user_id',
            'payroll_deduction_id'
        );
    }

    /**
     * preset
     *
     * @return BelongsTo
     */
    public function preset(): BelongsTo {

        return $this->belongsTo(PayrollPreset::class, 'preset_id', 'id');
    }

   







    public function defaultSettings(): Builder  {

        return $this->belongsTo(Setting::class, 'bo_id', 'id')
                      ->default();
    }




    ## Other Relations 

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
     * role
     *
     * @return BelongsTo
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(BusinessRole::class, 'role_id', 'id');
    }


    ## Common Relations

    /**
     * file
     *
     * @return MorphOne
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
    }

    /**
     * files
     *
     * @return MorphMany
     */
    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'fileable');
    }

    /**
     * Summary of otp
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function otp(): MorphMany
    {
        return $this->MorphMany(Otp::class, 'otpable');
    }



    ## All Admin Relations 

    /**
     * affiliateAdmin
     *
     * @return BelongsTo
     */
    public function affiliateAdmin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'affiliate_admin_id', 'id');
    }

    ## All Business Relations 

    /**
     * settings
     *
     * @return HasMany
     */
    public function settings(): HasMany
    {
        return $this->hasMany(Setting::class, 'bo_id', 'id')->latest();
    }

    /**
     * folders
     *
     * @return HasMany
     */
    public function folders(): HasMany
    {
        return $this->hasMany(Folder::class, 'bo_id', 'id')->latest();
    }

    /**
     * notificationTemplates
     *
     * @return HasMany
     */
    public function notificationTemplates(): HasMany
    {
        return $this->hasMany(NotificationTemplate::class, 'bo_id', 'id')->latest();
    }

    /**
     * Summary of businessLocations
     * @return HasMany
     */
    public function businessLocations(): HasMany
    {
        return $this->hasMany(BusinessLocation::class, 'bo_id', 'id')->latest();
    }

    /**
     * roles
     *
     * @return HasMany
     */
    public function roles(): HasMany
    {
        return $this->hasMany(BusinessRole::class, 'bo_id', 'id');
    }

    /**
     * departments
     *
     * @return HasMany
     */
    public function departments(): HasMany{

        return $this->hasMany(Department::class,'bo_id', 'id');
    }

    /**
     * runningSubscription
     *
     * @return HasOne
     */
    public function runningSubscription(): HasOne{
        return $this->hasOne(Subscription::class,'bo_id')->running();
    }

    /**
     * subscriptions
     *
     * @return HasMany
     */
    public function subscriptions(): HasMany{
        
        return $this->hasMany(Subscription::class,'bo_id', 'id');
    }

    /**
     * creditLogs
     *
     * @return HasMany
     */
    public function creditLogs(): HasMany{

        return $this->hasMany(CreditLog::class,'bo_id', 'id');
    }

    /**
     * paymentLogs
     *
     * @return HasMany
     */
    public function paymentLogs(): HasMany{

        return $this->hasMany(PaymentLog::class,'bo_id', 'id');
    }

    /**
     * transactionLog
     *
     * @return HasMany
     */
    public function transactionLog(): HasMany{

        return $this->hasMany(TransactionLog::class,'bo_id', 'id');
    }

    /**
     * assets
     *
     * @return HasMany
     */
    public function assets(): HasMany{

        return $this->hasMany(Asset::class,'bo_id', 'id');
    }

    /**
     * bankAccounts
     *
     * @return HasMany
     */
    public function bankAccounts(): HasMany{

        return $this->hasMany(BankAccount::class,'bo_id', 'id');
    }

    /**
     * bankAccountTransactions
     *
     * @return HasMany
     */
    public function bankAccountTransactions(): HasMany{

        return $this->hasMany(BankAccountTransaction::class,'bo_id', 'id');
    }

    /**
     * expenseCategories
     *
     * @return HasMany
     */
    public function expenseCategories(): HasMany{

        return $this->hasMany(ExpenseCategory::class,'bo_id', 'id');
    }

    /**
     * expenses
     *
     * @return HasMany
     */
    public function expenses(): HasMany{

        return $this->hasMany(Expense::class,'bo_id', 'id');
    }

    /**
     * Summary of businessSetting
     * @return HasOne
     */
    public function businessSetting(): HasOne
    {
        return $this->hasOne(UserBusinessSetting::class, 'user_id');
    }

    /**
     * businessKycLogs
     *
     * @return HasMany
     */
    public function businessKycLogs(): HasMany{

        return $this->hasMany(KycLog::class, 'bo_id')->latest();
    }

    /**
     * holidays
     *
     * @return HasMany
     */
    public function holidays(): HasMany{

        return $this->hasMany(Holiday::class, 'bo_id')->latest();
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
     * shiftSettings
     *
     * @return HasMany
     */
    public function shiftSettings(): HasMany{

        return $this->hasMany(ShiftSetting::class, 'bo_id')->latest();
    }

    /**
     * businessAvailabilities
     *
     * @return HasMany
     */
    public function businessAvailabilities(): HasMany{

        return $this->hasMany(UserAvailability::class, 'bo_id')->latest();
    }

    /**
     * businessShifts
     *
     * @return HasMany
     */
    public function businessShifts(): HasMany{

        return $this->hasMany(Shift::class, 'bo_id')->latest();
    }

    /**
     * tasks
     *
     * @return HasMany
     */
    public function tasks(): HasMany{

        return $this->hasMany(Task::class, 'bo_id')->latest();
    }

    /**
     * departmentGroups
     *
     * @return HasMany
     */
    public function departmentGroups(): HasMany{

        return $this->hasMany(DepartmentGroup::class, 'bo_id')->latest();
    }

    /**
     * documentTemplates
     *
     * @return HasMany
     */
    public function documentTemplates(): HasMany{

        return $this->hasMany(DocumentTemplate::class, 'bo_id')->latest();
    }

    /**
     * shiftTemplates
     *
     * @return HasMany
     */
    public function shiftTemplates(): HasMany{

        return $this->hasMany(ShiftTemplate::class, 'bo_id')->latest();
    }

    /**
     * businessShiftRequests
     *
     * @return HasMany
     */
    public function businessShiftRequests(): HasMany
    {
        return $this->hasMany(ShiftRequest::class, 'bo_id')->latest();
    }

    /**
     * accessPointWhiteLists
     *
     * @return HasMany
     */
    public function accessPointWhiteLists(): HasMany
    {
        return $this->hasMany(AccessPointWhiteList::class, 'bo_id')->latest();
    }

    /**
     * businessCompanies
     *
     * @return HasMany
     */
    public function businessCompanies(): HasMany
    {
        return $this->hasMany(Company::class, 'bo_id')->latest();
    }

    /**
     * companyShiftSettings
     *
     * @return HasMany
     */
    public function companyShiftSettings(): HasMany
    {
        return $this->hasMany(CompanyShiftSetting::class, 'bo_id')->latest();
    }

    /**
     * news
     *
     * @return HasMany
     */
    public function news(): HasMany
    {
        return $this->hasMany(BusinessNews::class, 'bo_id')->latest();
    }

    /**
     * payrolls
     *
     * @return HasMany
     */
    public function payrolls(): HasMany
    {
        return $this->hasMany(Payroll::class, 'bo_id')->latest();
    }

    /**
     * payrollAllowances
     *
     * @return HasMany
     */
    public function payrollAllowances(): HasMany
    {
        return $this->hasMany(PayrollAllowance::class, 'bo_id')->latest();
    }

    /**
     * payrollDeductions
     *
     * @return HasMany
     */
    public function payrollDeductions(): HasMany
    {
        return $this->hasMany(PayrollDeduction::class, 'bo_id')->latest();
    }

    /**
     * payrollAllowanceUsage
     *
     * @return HasMany
     */
    public function payrollAllowanceUsage(): HasMany
    {
        return $this->hasMany(PayrollAllowanceUsage::class, 'bo_id')->latest();
    }

    /**
     * payrollDeductionUsage
     *
     * @return HasMany
     */
    public function payrollDeductionUsage(): HasMany
    {
        return $this->hasMany(PayrollDeductionUsage::class, 'bo_id')->latest();
    }

    /**
     * businessAttendances
     *
     * @return HasMany
     */
    public function businessAttendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'bo_id')->latest();
    }

    /**
     * leaveTypes
     *
     * @return HasMany
     */
    public function leaveTypes(): HasMany
    {
        return $this->hasMany(LeaveType::class, 'bo_id')->latest();
    }

    /**
     * businessLeaveRequests
     *
     * @return HasMany
     */
    public function businessLeaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class, 'bo_id')->latest();
    }

    /**
     * payrollTransactions
     *
     * @return HasMany
     */
    public function payrollTransactions(): HasMany
    {
        return $this->hasMany(PayrollTransaction::class, 'bo_id')->latest();
    }

    /**
     * disputeRequest
     *
     * @return HasMany
     */
    public function disputeRequests(): HasMany
    {
        return $this->hasMany(DisputeRequest::class, 'bo_id')->latest();
    }

    /**
     * companyInvoices
     *
     * @return HasMany
     */
    public function companyInvoices(): HasMany
    {
        return $this->hasMany(CompanyInvoice::class, 'bo_id')->latest();
    }

    /**
     * openShifts
     *
     * @return HasMany
     */
    public function openShifts(): HasMany
    {
        return $this->hasMany(OpenShift::class, 'bo_id')->latest();
    }

    /**
     * taxes
     *
     * @return HasMany
     */
    public function taxes(): HasMany
    {
        return $this->hasMany(Tax::class, 'bo_id')->latest();
    }


    ## All Employee Relations 

    /**
     * attendances
     *
     * @return HasMany
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'user_id', 'id');
    }

    /**
     * leaveRequests
     *
     * @return HasMany
     */
    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class, 'user_id', 'id');
    }

    /**
     * availabilities
     *
     * @return HasMany
     */
    public function availabilities(): HasMany
    {
        return $this->hasMany(UserAvailability::class, 'user_id')->latest();
    }

    /**
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class, 'employee_id')->latest();
    }

    /**
     * shiftRequests
     *
     * @return HasMany
     */
    public function shiftRequests(): HasMany
    {
        return $this->hasMany(ShiftRequest::class, 'employee_id')->latest();
    }

    /**
     * employeeCompanies
     *
     * @return HasMany
     */
    public function employeeCompanies(): HasMany
    {
        return $this->hasMany(EmployeeCompany::class, 'employee_id')->latest();
    }

    /**
     * wages
     *
     * @return HasOne
     */
    public function wages(): HasOne
    {
        return $this->hasOne(Wage::class, 'employee_id', 'id');
    }

    /**
     * employeePayrolls
     *
     * @return HasMany
     */
    public function employeePayrolls(): HasMany
    {
        return $this->hasMany(Payroll::class, 'user_id', 'id');
    }

    /**
     * employeeAllowanceUsage
     *
     * @return HasMany
     */
    public function employeeAllowanceUsage(): HasMany
    {
        return $this->hasMany(PayrollAllowanceUsage::class, 'user_id', 'id');
    }

    /**
     * employeeDeductionUsage
     *
     * @return HasMany
     */
    public function employeeDeductionUsage(): HasMany
    {
        return $this->hasMany(PayrollDeductionUsage::class, 'user_id', 'id');
    }

    /**
     * employeeDisputerequests
     *
     * @return HasMany
     */
    public function employeeDisputerequests(): HasMany
    {
        return $this->hasMany(DisputeRequest::class, 'user_id', 'id');
    }
}
