<?php

namespace Modules\SmsMessaging\Http\Resources\Api\v1;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SmsProviderDeviceCollection extends ResourceCollection
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
