<?php

namespace Modules\UserMessaging\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;


class UserWithConversationResource extends JsonResource
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
                    'name'              => $this->name,
                    'email'             => $this->email,
                    'img_url'           => $this->getimageURL(
                                                                file: $this->file,
                                                                location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                                             ),

                    'is_online' => $this->last_login_time
                                                        ? $this->last_login_time->diffInMinutes(now()) < 2 &&     $this->show_online_status
                                                        : false,


                    'show_online_status' => (bool) $this->show_online_status,

                ];



        if($this->conversation){
            $data['conversation'] = new UserConversationResource($this->conversation);
        }




        return $data;

    }
}
