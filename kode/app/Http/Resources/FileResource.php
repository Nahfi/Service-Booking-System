<?php

namespace App\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Models\Folder;
use App\Traits\Common\Fileable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    use Fileable;

    protected static ? object $business = null;

    public static function setBusiness($business)
    {
        self::$business = $business;
    }
    
   
    public function toArray(Request $request): array
    {

        $imgURL = get_default_img();
        return [
            'id'           => $this->id,
            'url'          => $imgURL,
            'name'         => $this->name,
            'display_name' => $this->display_name,
            'disk'         => $this->disk,
            'type'         => $this->type,
            'access_type'  => $this->access_type,
            'size'         => $this->size,
            'extension'    => $this->extension,
            'created_at'   => get_date_time($this->created_at, $timeZone, $timeFormat),
        ];
    }


}
