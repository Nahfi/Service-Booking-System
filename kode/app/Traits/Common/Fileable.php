<?php

namespace App\Traits\Common;

use App\Enums\Settings\GlobalConfig;
use App\Http\Resources\FileResource;
use App\Models\File as ModelsFile;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Laravel\Facades\Image;



use Illuminate\Http\UploadedFile;
use Throwable;

trait Fileable
{



    /**
     * Summary of storeFile
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $location
     * @param mixed $size
     * @param mixed $removeFile
     * @param mixed $name
     * @return array
     */
    public function storeFile(UploadedFile $file , string $location , ? string $size = null ,  ? ModelsFile $removeFile = null , ? string $name = null ): array{


        $name          = uniqid() . time() . '.' . $file->getClientOriginalExtension();
        $imagePath     = $location . '/' .$name ;
        $status        = true;
        $inputFile     = $file;
        $displayName   = $file->getClientOriginalName();


    
        //remove file if exists
        if($removeFile) $this->unlink($location,$removeFile); 


        if (!file_exists($location))   mkdir($location, 0755, true);
        
        switch (substr($file->getMimeType(), 0, 5)) {
            case 'image':

                $image = Image::read(file_get_contents($file));

                if (isset($size)) {
                    list($width, $height) = explode('x', strtolower($size));
                    $image->scaleDown($width, $height);
                }

      
                $image->save($imagePath);
                break;
        
            default:
     
                $file->move($location, $name);
                break;
        }

       

        $size = 20000;
        try {
            $size = @$inputFile->getSize();
        } catch (\Throwable $th) {

        }


        return [
            'status'      => $status,
            'name'        => $name,
            'display_name'=> $displayName,
            'disk'        => 'local',
            "size"        => $this->formatSize($size),
            "extension"   => strtolower($file->getClientOriginalExtension())
        ];

    }



    /**
     * Get file size
     * 
     * @param  int|string $bytes
     * @return string
     */
    public function formatSize(string|int $bytes): string{
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        for ($i = 0; (int) $bytes >= 1024 && $i < 4; $i++) {
            $bytes /= 1024;
        }
        return round($bytes, 2) . ' ' . $units[$i];
    }




    
    /**
     * Summary of unlink
     * @param string $location
     * @param mixed $file
     * @return bool
     */
    public function unlink(string $location ,?ModelsFile $file = null): bool{


        try {

            if($file){


                if (file_exists(filename: $location . '/' . @$file->name) && is_file($location . '/' . @$file->name)) @unlink($location . '/' . @$file->name);

                @$file->delete();

            }



        } catch (\Exception $ex) {
            return false;
        }

        return true;
    }

    /**
     * Summary of unlinkEditorFiles
     * @param array $files
     * @param string $location
     * @return void
     */
    public function unlinkEditorFiles(array $files, string $location = GlobalConfig::FILE_PATH['text_editor']['path']): void{
       
        try {
            collect($files)->map(function(string $file) use($location): void{
                if(file_exists(filename: $location . '/' . @$file) && is_file($location . '/' . @$file)) @unlink($location . '/' . @$file);
            });
        } catch(Throwable $th) {}
    }


  



    /**
     * Summary of getimageURL
     * @param \App\Models\File|null $file
     * @param string $location
     * @param mixed $foreceSize
     * @return string
     */
    public function getimageURL(ModelsFile | FileResource | null $file = null, string $location , ? string $foreceSize  = null): string{

        $image     = $location."/".@$file->name;
        
        $imageURL  = asset('assets/file_manager/images/default/default.jpg');


        if (file_exists($image) && is_file($image))  $imageURL =  asset($image , true);

        return  $imageURL;          
    }



 

    /**
     * Check if file exists or not
     *
     * @param string $url
     * @return boolean
     */
    public static function  check_file(string $url) :bool{
        $headers = get_headers($url);
        return (bool) preg_match('/\bContent-Type:\s+(?:image|audio|video)/i', implode("\n", $headers));
    }

    /**
     * unlinkLogFile
     *
     * @param Model $model
     * @param string $path
     * 
     * @return bool
     */
    public function unlinkLogFile(Model $model ,string $path): bool{
        try {

        
            $model?->file?->map(fn(ModelsFile $file):bool => $this->unlink(
                location    : $path,
                file        : $file
            ));
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}