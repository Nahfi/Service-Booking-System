<?php

namespace Modules\User\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserSessionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        $token = $request->bearerToken();
        $hashedToken = hash('sha256', explode('|', $token)[1] ?? '');

        
        return [
            'id'                => $this->id,
            'ip_address'        => $this->ip_address,
            'user_agent'        => $this->user_agent,
            'device_name'       => $this->device_name,
            'last_active_at'    => $this->last_active_at ? get_date_time($this->last_active_at) : null ,
            'created_at'        => $this->created_at ? get_date_time($this->created_at) : null,
            'is_current_device' => $this->token === $hashedToken,
        ];


    }
}
