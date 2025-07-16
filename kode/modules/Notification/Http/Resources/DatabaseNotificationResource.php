<?php

namespace Modules\Notification\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DatabaseNotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request): array
    {

        return  [
            'id'                => $this->id,
            'message'           => $this->message,
            'payload'           => $this->payload,
            'is_read'           => (bool) $this->is_read,
            'initiate_at'       => get_date_time($this->created_at )
        ];
    }
}
