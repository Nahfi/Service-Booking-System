<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\User\Http\Resources\UserResource;

class ContactGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
         $data = [
            'uid'                       => $this->uid,
            'name'                      => $this->name,
            'channel'                   => $this->channel,
            'attribute_configurations'  => $this->attribute_configurations,
            'status'                    => $this->status,

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

        if ($this->relationLoaded('contacts') 
            && $this->contacts) {
            $data['contacts'] = new ContactCollection(resource: $this->contacts);
        }

        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = new UserResource(resource: $this->user);
        }
        
        return $data;
    }
}
