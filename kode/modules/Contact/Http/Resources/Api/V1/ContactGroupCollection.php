<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ContactGroupCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
