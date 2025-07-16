<?php

namespace Modules\Settings\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationGatewayResource extends JsonResource
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
            'id'             => $this->id,
            'status'         => $this->status,
            'group'          => $this->group,
            'sub_group'      => $this->sub_group,
            'is_default'     => (bool)$this->is_default ,
            'key'            => $this->key,
            'credential'     => $this->value ? json_decode( $this->value) : null ,
            'created_at'     => get_date_time($this->created_at),
        ];
    }
}
