<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    use Fileable;

    public function toArray(Request $request): array
    {
        
        $data = [
            'uid'               => $this->uid,
            'name'              => $this->name,
            'img_url'           => $this->relationLoaded('file') && $this->file 
                                        ? $this->getimageURL(
                                            file: $this->file,
                                            location: GlobalConfig::FILE_PATH['contact']['path'])
                                        : null,
            'channel'           => $this->channel,
            'phone_number'      => $this->phone_number,
            'email'             => $this->email,
            'custom_attributes' => $this->custom_attributes,
            'is_favorite'       => $this->is_favorite ? true : false,
            'status'            => $this->status,

            'deleted_at'        => get_date_time($this->deleted_at),
            'raw_deleted_at'        => $this->deleted_at,
            'created_at'        => get_date_time($this->created_at),
            'raw_created_at'        => $this->created_at,
            'updated_at'        => get_date_time($this->updated_at),
            'raw_updated_at'        => $this->updated_at,
        ];

        if ($this->relationLoaded('group') && $this->group) {
            $data['group'] = new ContactGroupResource(resource: $this->group);
        }
        
        return $data;
    }
}
