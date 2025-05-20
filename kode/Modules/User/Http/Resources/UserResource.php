<?php

namespace Modules\User\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    use Fileable;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $data = [

            'id'                 => $this->id,
            'uid'                => $this->uid,
            'fcm_token'          => $this->fcm_token,
            'name'               => $this->name,
            'img_url'            => $this->getimageURL(
                                            file: $this->file,
                                            location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                        ),
            'phone'              => $this->phone,
            'email'              => $this->email,

            'meta_data'          => $this->meta_data,
            'address'            => $this->address,
            'visible_password'   => $this->visible_password,
            'status'             => $this->status,
            'google2fa_secret'   => $this->google2fa_secret,
            'recovery_codes'     => $this->recovery_codes,
            'two_factor_enabled' => (bool) $this->two_factor_enabled,
            'two_factor_confirmed_at' => $this->two_factor_confirmed_at 
                                            ? get_date_time($this->two_factor_confirmed_at) 
                                            : null,

            'last_login_time'        => $this->last_login_time 
                                        ? get_date_time($this->last_login_time) 
                                        : null,
                                        
            'created_at'         => get_date_time($this->created_at),
            'deleted_at'         => $this->deleted_at ? get_date_time($this->deleted_at) : null,
        ];


          
        if ($this->relationLoaded('role') 
                && $this->role) {

            $data['role'] = new RoleResource($this->role);
        }
        
        
        return $data;
    }
}
