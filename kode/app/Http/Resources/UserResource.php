<?php

namespace App\Http\Resources;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Traits\Common\Fileable;
use App\Enums\Settings\GlobalConfig;
use App\Http\Resources\UserSettingResource;
use App\Http\Resources\Business\RoleResource;
use App\Http\Resources\Business\WageResource;
use App\Http\Resources\UserLocationCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Business\CompanyResource;
use App\Http\Resources\Business\CompanyCollection;
use App\Http\Resources\Business\ShiftRequestCollection;
use App\Http\Resources\Business\Payroll\PresetResource;
use App\Http\Resources\Business\UserAvailabilityCollection;
use App\Http\Resources\Business\BusinessDocumentTemplateCollection;
use App\Http\Resources\Business\BusinessDocumentTemplateResource;
use App\Http\Resources\Business\ShiftRequestResource;
use App\Http\Resources\Business\ShiftSettingsResource;
use App\Http\Resources\Business\UserAvailabilityResource;

class UserResource extends JsonResource
{
    use Fileable;

    protected static ? object $business = null;

    public static function setBusiness($business)
    {
        self::$business = $business;
    }
    
    public function __construct($resource, $business = null)
    {
        parent::__construct($resource);
        self::$business = getResourceBusiness($business, self::$business );
    }

    /**
     * toArray
     *
     * @param Request $request
     * 
     * @return array
     */
    public function toArray(Request $request): array
    {
        $business   = self::$business; 
        
        $timeZone   = $business?->time_zone;
        $timeFormat = $business?->time_format;

        $businessSetting = $this->parent_id ? @self::$business?->user?->businessSetting :  $this?->businessSetting; 


        
        $data = [
            'id'                => $this->id,
            'uid'               => $this->uid,
            'allocated_work_hours' => $this->allocated_work_hours,
            'total_hours_worked'  => $this->total_hours_worked,
            'name'              => $this->name,
            'designation'       => $this->designation,
            'wage'              => $this->wage,
            'employee_job_type' => $this->employee_job_type,
            'date_of_birth'     => $this->date_of_birth,
            'converted_date_of_birth'   => $this->date_of_birth
                                            ? get_date_time($this->date_of_birth, $timeZone, $timeFormat) 
                                            : null,
            'human_readable_date_of_birth'   => $this->date_of_birth ? $this->date_of_birth->format('jS \of F') : null,
            'joined_at'         => $this->joined_at,
            'converted_joined_at'         => $this->joined_at
                                                ? get_date_time($this->joined_at, $timeZone, $timeFormat) 
                                                : null,
            'gender'            => $this->gender,
            'marital_status'    => $this->marital_status,
            'img_url'           => $this->getimageURL(
                                            file: $this->file,
                                            location: $this->is_owner == true 
                                                ? GlobalConfig::FILE_PATH['profile']['business']['path']
                                                : GlobalConfig::FILE_PATH['profile']['employee']['path']
                                        ),
            'phone'             => $this->phone,
            'email'             => $this->email,
            'default_work_hour' => $this->default_work_hour,
            'contact_email'     => $this->contact_email,
            'meta_data'         => $this->transformMetaData($this->meta_data),
            'is_email_verified' => $this->email_verified_at ? true : false,

            'email_verified_at' => $this->email_verified_at 
                                        ? get_date_time($this->email_verified_at, $timeZone, $timeFormat) 
                                        : null,
            'last_login_time'   => $this->last_login_time 
                                        ? get_date_time($this->last_login_time, $timeZone, $timeFormat) 
                                        : null,
                                        
            'fcm_token'         => $this->fcm_tokenm_token,
            'visible_password'  => $this->visible_password,
            'status'            => $this->status,
            'is_kyc_verified'   => $this->is_kyc_verified == true ? true : false,
            'is_verified'   => $this->is_verified == true ? true : false,
            'employee_id'       => $this->employee_id,

            'address'           => $this->address,
            'access_department'           => $this->access_department,
            'current_location'            => @$this->current_location,
            'remaining_paid_annual_hours'           => $this->remaining_paid_annual_hours,
            'created_at'        => get_date_time($this->created_at, $timeZone, $timeFormat),
            'deleted_at'        => $this->deleted_at ? get_date_time($this->deleted_at, $timeZone, $timeFormat) : null,
        ];
        
        
        
        if ($this->relationLoaded('businessLocations') 
                && $this->businessLocations) {

            UserLocationResource::setBusiness($business);
            $data['locations'] = new UserLocationCollection($this->businessLocations);
        }

        if ($this->relationLoaded('location') 
                && $this->location) {

            $data['location'] = new UserLocationResource($this->location, $business);
        }


        if ($businessSetting) {
                    
            $data['setting'] = new UserSettingResource($businessSetting,  $business);
        }
        
        if ($this->relationLoaded('wages') 
                && $this->wages) {

            $data['wages'] = new WageResource($this->wages, $business);
        }

        if ($this->relationLoaded('shiftSetting') 
                && $this->shiftSetting) {
                    
            $data['shift_setting'] = new ShiftSettingsResource($this->shiftSetting, $business);
        }
        
        if ($this->relationLoaded('role') 
                && $this->role) {

            $data['role'] = new RoleResource($this->role, $business);
        }
        
        if ($this->relationLoaded('preset') 
                && $this->preset) {

                    // @dd($this->preset);
                    
            $data['preset'] = new PresetResource($this->preset, $business);
        }
        
        if ($this->relationLoaded('companies') 
                && $this->companies) {

            CompanyResource::setBusiness($business);

            $data['companies'] = new CompanyCollection($this->companies);
            
            if ($this->relationLoaded('wages') 
                && $this->wages) {
                    
                $eligibleCompanies = Company::where('bo_id', $this->parent_id)
                                                ->whereHas('companyDepartments', function ($query) {
                                                    
                                                    $query->where('department_id', $this->wages->department_id);
                                                })
                                                ->get();
                CompanyResource::setBusiness($business);
                $data['eligible_companies'] = new CompanyCollection($eligibleCompanies);
            }
        }
        
        
        if ($this->relationLoaded('shifts') 
                && $this->shifts) {
                    
            ShiftResource::setBusiness($business);
            $data['shifts'] = new ShiftCollection($this->shifts);
        }

        
        
        if ($this->relationLoaded('shiftRequests') 
                && $this->shiftRequests) {
            ShiftRequestResource::setBusiness($business);
            $data['shift_requests'] = new ShiftRequestCollection($this->shiftRequests);
        }
        
        
        if ($this->relationLoaded('availabilities') 
                && $this->availabilities) {
            UserAvailabilityResource::setBusiness($business);
            $data['availabilities'] = new UserAvailabilityCollection($this->availabilities);
        }

        
        
        if ($this->relationLoaded('documents') 
                && $this->documents) {

            BusinessDocumentTemplateResource::setBusiness($business);
            $data['documents'] = new BusinessDocumentTemplateCollection($this->documents);
        }

        
        return $data;
    }

    /**
     * transformMetaData
     *
     * @param mixed $data
     * 
     * @return array
     */
    private function transformMetaData($data): array 
    {
        return collect($data)
            ->map(function ($item, $key) {
                return is_object($item) && isset($item->value) && $item->value !== null
                    ? [$key => $item->value]
                    : null;
            })
            ->filter()
            ->collapse()
            ->toArray();
    }
}
