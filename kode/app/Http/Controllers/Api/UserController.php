<?php

namespace App\Http\Controllers\Api\Business;

use App\Models\Department;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use App\Traits\Subscriptionable;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Business\Employee\UserBulkSaveRequest;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\Business\UserCompanyRequest;
use App\Http\Requests\Business\Employee\UserRequest;
use App\Http\Services\Business\Employee\UserService;
use App\Models\BusinessRole;
use App\Models\PayrollPreset;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserController extends Controller implements HasMiddleware
{
    use Subscriptionable, ModelAction;
    
    protected ?User $user;

    public function __construct()
    {
        $this->user = getAuthUser('user:api', ['business', 'file', 'runningSubscription', 'businessSetting']);
    }

    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'business.permissions:view_users', only: [
                'index',
                'sendInvitation',
                'userReports'
            ]),
            new Middleware(middleware: 'business.permissions:save_user', only: [
                'store',
                'assignCompanies',
                'update',
                'bulkSave',
                'saveAccessDepartment'
            ]),
            new Middleware(middleware: 'business.permissions:delete_user', only: ['destroy'])
        ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return UserService::getEmployees(getBusiness($this->user));
    }

    public function userReports(): JsonResponse
    {
        return UserService::getUserReports(getBusiness($this->user));
    }

    /**
     * store
     *
     * @param UserRequest $request
     * 
     * @return JsonResponse
     */
    public function store(UserRequest $request): JsonResponse {

        if(!$this->subscriptionCreditChecker(getBusiness($this->user))) 
            throw new Exception(translate("No available slots to add a new employee"), Response::HTTP_FORBIDDEN);
        return UserService::save(getBusiness($this->user), (object) $request->except('_token'));
    }





    /**
     * Summary of bulkSave
     * @param \App\Http\Requests\Business\Employee\UserBulkSaveRequest $request
     * @return void
     */
    public function bulkSave(UserBulkSaveRequest $request): JsonResponse{

 

                #GET BUSINESS AND SUBSCRIPTIONS

                $business =  getBusiness($this->user);
                if(!$business->relationLoaded('runningSubscription')) $business = $business->load(['runningSubscription']);

                $runningSubscription = $business?->runningSubscription;


                #CHECK REMAINING CREDIT 

                $users = $request->input('user');
                $totalUser = count($users) + User::where('parent_id' , $business->id)
                                                    ->count();

                
                if(!$runningSubscription || $runningSubscription->total_employee <  $totalUser)
                        throw new Exception(translate("You dont have enough employee credit in your current subscription"), Response::HTTP_FORBIDDEN);
            
            
                #PREPARE USERS DATA

                $role =  BusinessRole::employee()->firstOrFail();


                $uniqueJobTypes = collect($users)->pluck('employee_job_type')
                                                        ->unique()
                                                        ->values();



                $presets = PayrollPreset::where("bo_id", $business->id)
                                                    ->active()
                                                    ->whereIn("employee_job_type", $uniqueJobTypes)
                                                    ->get()
                                                    ->groupBy('employee_job_type')
                                                    ->map(function ($group) {
                                                        $preset = $group->first();
                                                        return [
                                                            'id' => $preset->id,
                                                            'type' => $preset->employee_job_type,
                                                        ];
                                                    })
                                                    ->values()
                                                    ->pluck('id','type')
                                                    ->toArray(); 


                $currentTimestamp = Carbon::now();


                $users = collect($request->input('user'))
                          ->map(function(array $user) use(
                                                                      $currentTimestamp , 
                                                                      $business , 
                                                                      $role ,  
                                                                      $presets
                                                                    ) : array{

                        $employeeId = generate_employee_id($business);

    
                        $jobType = Arr::get($user,'employee_job_type');
                        $presetId = Arr::get($presets ,  $jobType);
                        $joiningDate = Arr::get($user,'joined_at' ,Carbon::now());
                        $user['uid']                = Str::uuid();
                        $user['created_at']         = $currentTimestamp;
                        $user['status']             = Status::ACTIVE->value;
                        $user['parent_id']          = $business->id;
                        $user['employee_id']        = generate_employee_id($business);
                        $user['role_id']            = $role->id;
                        $user['is_owner']           = false;

                        $user['password']           = Hash::make($employeeId);
                        $user['visible_password']   = $employeeId;
                        $user['preset_id']          = $presetId;

                        $user['joined_at'] =  Carbon::parse( $joiningDate);

                        return $user;
                });
                

 

                 try {

                     #INSERT DATA
                     collect($users->chunk(100)->all())
                                     ->map(function( $chunkusers): void {
                                             User::insert($chunkusers->toArray()); 
                                     });

                 } catch (\Throwable $th) {
                        throw new Exception(
                            translate("Invalid data submitted. Please verify that all date inputs are in the correct format and try again."), 
                            Response::HTTP_FORBIDDEN
                        );
                 }                   



                return ApiResponse::asSuccess()
                                    ->build();   




       
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id){}
    
    /**
     * update
     *
     * @param UserRequest $request
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function update(UserRequest $request, string $id): JsonResponse
    {
        return UserService::save(getBusiness($this->user), (object) $request->except('_token'));
    }

    /**
     * assignCompanies
     *
     * @param UserCompanyRequest $request
     * 
     * @return JsonResponse
     */
    public function assignCompanies(UserCompanyRequest $request): JsonResponse
    {
        return UserService::assignCompanies(getBusiness($this->user), (object) $request->except('_token'));
    }

    /**
     * destroy
     *
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        return UserService::destroy($id);
    }

    /**
     * updateStatus
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function updateStatus(Request $request): JsonResponse {

        $validator = Validator::make($request->all() ,rules: [
            'id'            => 'required|exists:users,id',
            'value'         => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data    : ['errors' => $validator->errors()],
                    code    : Response::HTTP_BAD_REQUEST
                ));                        
  
        return $this->changeStatus(request: $request->except(keys: "_token"),actionData: [
            "model"                   => new User(),
            "filterable_attributes"   => ['id' => $request->input(key: 'id') ,'parent_id' => getBusiness($this->user)->id, 'is_owner' => false],
        ]);
    }

    /**
     * sendInvitation
     *
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function sendInvitation(string $id): JsonResponse{

        
        $employee =  User::employee()
                                ->where('parent_id',getBusiness($this->user)->id)
                                ->where('id',$id)
                                ->firstOrFail();
                                
        UserService::sendInvitation(getBusiness($this->user) , $employee);

        return ApiResponse::asSuccess()->build();
    }



    

    /**
     * Summary of saveAccessDepartment
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return JsonResponse
     */
    public function saveAccessDepartment(Request $request): JsonResponse{

        
        $validator = Validator::make($request->all() ,rules: [
            'user_id'                       => ['required','exists:users,id'],
            'department_ids'                => ['required', 'array'],
            'department_ids.*'              => ['required', 'exists:departments,id'],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data    : ['errors' => $validator->errors()],
                    code    : Response::HTTP_BAD_REQUEST
                ));    



        $business = getBusiness($this->user);
        $userId = $request->input("user_id");

        $departmentIds = Department::where('bo_id',$business->id)
                                    ->whereIn("id",$request->input('department_ids'))
                                    ->pluck('id')
                                    ->toArray();

                                    
        $employee =  User::with(['role'])
                                ->whereHas('role', function(Builder $q): Builder{
                                    return $q->where("is_employee", false);
                                })
                                ->withoutGlobalScope('autoload')
                                ->employee()
                                ->where('parent_id',$business->id)
                                ->where('id',$userId)
                                ->firstOrFail();
                                    

        $employee->access_department =  $departmentIds;
        $employee->save();
                
        return ApiResponse::asSuccess()->build();
    }
}
