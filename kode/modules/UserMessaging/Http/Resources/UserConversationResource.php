<?php

namespace Modules\UserMessaging\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Models\User;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\UserMessaging\Models\UserConversationPreference;

class UserConversationResource extends JsonResource
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

        $data =  [
                    'id'                => $this->id,
                    'created_at'        => get_date_time($this->created_at)
                ];




        if ($this->users &&  !$this->users->isEmpty()) {

            $userCollection =  $this->users?->map(function (User $user): array{

                                                return [

                                                    'id'      => $user ->id,
                                                    'name'    => $user ->name,
                                                    'img_url' => $this->getimageURL(
                                                                                    file: $this->file,
                                                                                    location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                                                                ),
                                                    'phone'   => $user->phone,
                                                    'email'   => $user->email,
                                                ];

                                        });


            $data['users'] = $userCollection;

        }



        if ($this->relationLoaded('conversationPreferences') && $this->conversationPreferences &&  !$this->conversationPreferences->isEmpty()) {

            $preferenceCollection =  $this->conversationPreferences?->map(function (UserConversationPreference $userConversationPreference): array{

                                            return [
                                                'id'          => $userConversationPreference->id,
                                                'user_id'     => $userConversationPreference->user_id,
                                                'is_muted'    => (bool) $userConversationPreference->is_muted,
                                                'is_blocked'  => (bool) $userConversationPreference->is_blocked,
                                            ];

                                        });

            $data['conversation_preferences'] = $preferenceCollection;

        }


        if($this->relationLoaded('latestMessage') && $this->latestMessage){
            $data['latest_message'] = new UserMessageResource($this->latestMessage);
        }

        return $data;

    }
}
