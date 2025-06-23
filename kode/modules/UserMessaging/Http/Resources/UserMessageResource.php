<?php

namespace Modules\UserMessaging\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Settings\Http\Resources\FileCollection;

class UserMessageResource extends JsonResource
{
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
                    'created_at'                  => get_date_time($this->created_at),
                ];


        if ($this->relationLoaded('sender') 
                && $this->sender) {

            $sender =  $this->sender;

            $data['sender'] = [
                                'id'    => $sender->id,
                                'name'  => $sender->name,
                                'email' => $sender->email,
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

        return $data;      
        
    }
}
