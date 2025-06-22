<?php

namespace Modules\Settings\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Traits\Common\ModelAction;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{

    use ModelAction;


    protected string $path;

    public function __construct($resource, string $path)
    {
        parent::__construct($resource);
        $this->path = $path;
    }



    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

         return [
            'id'           => $this->id,
            'url'          => $this->getimageURL(
                                        file     : $this,
                                        location : $this->path
                                    ),
            'name'         => $this->name,
            'display_name' => $this->display_name,
            'disk'         => $this->disk,
            'type'         => $this->type,
            'size'         => $this->size,
            'extension'    => $this->extension,
            'created_at'   => get_date_time($this->created_at),
        ];
    }
}
