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

   
    /**
     * toArray
     *
     * @param Request $request
     * 
     * @return array
     */
    public function toArray(Request $request): array
    {
      

        $data = [
            'id'                => $this->id,
            'uid'               => $this->uid,
            
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
            'meta_data'         => $this->meta_data,
            'is_email_verified' => $this->email_verified_at ? true : false,

            'email_verified_at' => $this->email_verified_at 
                                        ? get_date_time($this->email_verified_at, $timeZone, $timeFormat) 
                                        : null,
            'last_login_time'   => $this->last_login_time 
                                        ? get_date_time($this->last_login_time, $timeZone, $timeFormat) 
                                        : null,
                                        
            'fcm_token'         => $this->fcm_tokenm_token,
            'status'            => $this->status,


            'address'           => $this->address,
            'created_at'        => get_date_time($this->created_at, $timeZone, $timeFormat),
            'deleted_at'        => $this->deleted_at ? get_date_time($this->deleted_at, $timeZone, $timeFormat) : null,
        ];
        
        
    
        return $data;
    }

   
}
