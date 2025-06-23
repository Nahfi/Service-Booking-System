<?php

namespace Modules\Settings\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        $languageConfiguration = @json_decode($this->value);
       
        return [
            'id'             => $this->id,
            'status'         => $this->status,
            'is_default'     => (bool) $this->is_default,
            'direction'     =>  $languageConfiguration?->direction ?? 'ltr',
            'name'           => $languageConfiguration?->name,
            'code'           => $languageConfiguration?->code,
            'created_at'     => $this->created_at ? get_date_time($this->created_at) : null,
        ];
    }
}
