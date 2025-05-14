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

            'id'                => $this->id,
            'uid'               => $this->uid,
            'fcm_token'         => $this->fcm_token,
            'name'              => $this->name,
            'img_url'           => $this->getimageURL(
                                            file: $this->file,
                                            location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                        ),
            'phone'             => $this->phone,
            'email'             => $this->email,

            'meta_data'         => $this->meta_data,

            'last_login_time'   => $this->last_login_time 
                                        ? get_date_time($this->last_login_time,) 
                                        : null,
                                        
       
            'created_at'        => get_date_time($this->created_at),
            'deleted_at'        => $this->deleted_at ? get_date_time($this->deleted_at) : null,
        ];
        
        return $data;
    }
}
