<?php

namespace Modules\User\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'permissions'  => $this->permissions,
            'status'       => $this->status,
            'created_at'   => get_date_time($this->created_at)
        ];
    }
}
