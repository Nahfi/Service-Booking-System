<?php

namespace Modules\Settings\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Settings\Enums\DefaultSettings;

class SettingsResource extends JsonResource
{

    use Fileable;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
       

       $value =  $this->file
                    ? $this->getimageURL(
                                            $this->file, 
                                            GlobalConfig::FILE_PATH[$this->key][ 'user']['path']
                                        ) 
                    : (DefaultSettings::isKeyContainsJsonValue($this->key) ? json_decode($this->value , true) : $this->value) ;


       $data =  [
            'key'        => $this->key,
            'group'      => $this->group,
            'sub_group'  => $this->sub_group,
            'value'      => $value ,
            'status'     => $this->status,
            'is_default' => (bool) $this->is_default,
            'created_at' => get_date_time($this->created_at)
       ];

       return $data ;

    }
}
