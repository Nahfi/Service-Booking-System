<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $languageConfiguration = @json_decode($this->value);

        return [
            'id'             => $this->id,
            'status'         => $this->status,
            'is_default'     => $this->is_default ? true : false,
            'name'           => @$languageConfiguration?->name,
            'code'           => @$languageConfiguration?->code,
            'created_at'     => $this->created_at ? get_date_time($this->created_at) : null,
        ];
    }
}
