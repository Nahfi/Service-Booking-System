<?php

namespace Modules\Settings\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\User\Http\Resources\UserResource;

class NotificationLogResource extends JsonResource
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
            'id'                => $this->id,
            'message'           => $this->message,
            'custom_data'       => $this->custom_data,
            'gateway_response'  => $this->gateway_response,
            'status'            => $this->status,
            'receiver_model'    => $this->receiver_model,
            'model_data'        => new UserResource($this->receiver),
            'initiate_at'       => get_date_time($this->created_at )
        ];

        if ($this->relationLoaded('gateway') && $this->gateway)  $data['gateway'] = new NotificationGatewayResource($this->gateway);

        return $data;
    }
}
