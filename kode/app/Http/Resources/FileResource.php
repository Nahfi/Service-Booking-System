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
    
    public function __construct($resource, $business = null)
    {
        parent::__construct($resource);
        self::$business = getResourceBusiness($business, self::$business );
    }

    public function toArray(Request $request): array
    {
        $business   = self::$business; 
        $timeZone   = $business?->time_zone;
        $timeFormat = $business?->time_format;
    
        $folder = $this->folder;
    
        $imgURL = get_default_img();
        
        if($folder){
    
            $baseLocation = @$folder->is_file 
                                ? GlobalConfig::FILE_PATH_PREFIX 
                                : GlobalConfig::IMAGE_PATH_PREFIX;

            $fullPath = $baseLocation . '/' . $folder->name;

            if($folder->is_default)   $fullPath = $baseLocation . '/' . self::getFullPath($folder);
            
            $imgURL = $this->getimageURL($this , $fullPath);
        }
        
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


    /**
     * Summary of getFullPath
     * @param \App\Models\Folder $folder
     * @return string
     */
    private static function getFullPath(Folder $folder): string{

        if (!$folder->parent) return $folder->name;

        return self::getFullPath($folder->parent) . '/' . $folder->name;
    }
}
