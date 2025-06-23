<?php

namespace Modules\Settings\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FileCollection extends ResourceCollection
{


    protected string $path;

    public function __construct($resource, string $path)
    {
        parent::__construct($resource);
        $this->path = $path;
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($file) {
            return new FileResource($file, $this->path);
        })->all();
    }
}
