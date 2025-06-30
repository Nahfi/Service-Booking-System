<?php

namespace Modules\UserMessaging\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Settings\Http\Resources\FileCollection;
use Modules\UserMessaging\Models\UserMessageReaction;

class UserMessageResource extends JsonResource
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
                    'conversation_id'   => $this->conversation_id,
                    'content'           => $this->content,
                    'is_read'           => (bool )$this->is_read,
                    'deleted_by_sender'           => (bool )$this->deleted_by_sender,
                    'deleted_by_receiver'         => (bool )$this->deleted_by_receiver,
                    'created_at'                  => get_date_time($this->created_at)
                ];


        if ($this->relationLoaded('sender')
                && $this->sender) {

            $sender =  $this->sender;

            $data['sender'] = [
                                'id'    => $sender->id,
                                'name'  => $sender->name,
                                'email' => $sender->email,
                                'img_url'            => $this->getimageURL(
                                                            file: $sender->file,
                                                            location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                                        ),
                              ];


        }


        if ($this->relationLoaded('files')
                && $this->files) {

            $data['files'] = new FileCollection($this->files , GlobalConfig::FILE_PATH['messages']['user']['path']);

        }

        if ($this->relationLoaded('replyTo')
                && $this->replyTo) {


            $replyMessage = $this->replyTo;

            $data['reply_to'] = [
                'id'                => $replyMessage ->id,
                'content'           => $replyMessage->content
            ];

        }

        if ($this->relationLoaded('reactions')
                && $this->reactions) {

                $reactionCollection =  $this->reactions?->map(function (UserMessageReaction $reaction): array{

                                                $user  = $reaction->user;

                                                $data =  [
                                                    'id'=> $reaction->id,
                                                    'reaction'=> $reaction->reaction,
                                                    'created_at'=> get_date_time($reaction->created_at)
                                                ];

                                                if($user){

                                                        $data['user'] = [

                                                            'id'                 => $user ->id,

                                                            'name'               => $user ->name,
                                                            'img_url'            => $this->getimageURL(
                                                                                            file: $this->file,
                                                                                            location: GlobalConfig::FILE_PATH['profile']['user']['path']
                                                                                        ),
                                                            'phone'              => $user->phone,
                                                            'email'              => $user->email,
                                                        ];
                                                }

                                                return $data;

                                        });



            $data['reactions'] = $reactionCollection;

        }

        return $data;

    }
}
