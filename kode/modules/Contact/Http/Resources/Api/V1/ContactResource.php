<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use App\Traits\Common\Fileable;
use App\Enums\Settings\GlobalConfig;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\User\Http\Resources\UserResource;

class ContactResource extends JsonResource
{
    use Fileable;

    /**
     * toArray
     *
     * @param mixed $request
     * 
     * @return array
     */
    public function toArray($request): array
    {
        
        $data = [
            'uid'               => $this->uid,
            'name'              => $this->name,
            'img_url'           => $this->relationLoaded('file') && $this->file 
                                        ? $this->getimageURL(
                                            file: $this->file,
                                            location: GlobalConfig::FILE_PATH['contact']['path'])
                                        : null,
            'channel'           => $this->channel,
            'phone_number'      => $this->phone_number,
            'email'             => $this->email,
            'custom_attributes' => $this->custom_attributes,
            'is_favorite'       => $this->is_favorite ? true : false,
            'status'            => $this->status,

            'deleted_at'        => $this->deleted_at 
                                    ? get_date_time(date: $this->deleted_at)
                                    : null,
            'raw_deleted_at'    => $this->deleted_at,
            'created_at'        => $this->created_at 
                                    ? get_date_time(date: $this->created_at)
                                    : null,
            'raw_created_at'    => $this->created_at,
            'updated_at'        => $this->updated_at 
                                    ? get_date_time(date: $this->updated_at)
                                    : null,
            'raw_updated_at'    => $this->updated_at,
        ];

        if ($this->relationLoaded('contactGroups') 
            && $this->contactGroups) {
            $data['contact_groups'] = new ContactGroupCollection(resource: $this->contactGroups);
        }

        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = new UserResource(resource: $this->user);
        }
        
        return $data;
    }
}
