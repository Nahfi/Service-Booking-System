<?php

namespace Modules\Notification\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Settings\Http\Resources\NotificationGatewayResource;
use Modules\User\Http\Resources\UserResource;

class GatewayNotificationResource extends JsonResource
{

    use Fileable;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request): array
    {

        $data = [
            'id'                => $this->id,
            'message'           => $this->message,
            'custom_data'       => $this->custom_data,
            'gateway_response'  => $this->gateway_response,
            'status'            => $this->status,
            'initiate_at'       => get_date_time($this->created_at )
        ];

        if ($this->relationLoaded('gateway') && $this->gateway)  $data['gateway'] = new NotificationGatewayResource($this->gateway);



        if ($this->relationLoaded('receiver') && $this->receiver){

            $user = $this->receiver;

            $data['receiver_user'] = [
                                'id'    => $user->id,
                                'name'  => $user->name,
                                'email' => $user->email,
                                'img_url'            => $this->getimageURL(
                                                            file: $user->file,
                                                            location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                                        ),
                              ];;

        }
        return $data;
    }
}
