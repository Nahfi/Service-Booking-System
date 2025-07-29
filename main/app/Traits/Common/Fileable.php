<?php

namespace App\Traits\Common;

use App\Enums\Settings\GlobalConfig;
use App\Enums\Settings\SettingKey;
use App\Enums\Settings\StorageKey;
use App\Facades\ApiResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as HttpResponse;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Modules\Settings\Models\File;
use Throwable;
use Illuminate\Support\Facades\Storage;
use Modules\Settings\Http\Resources\FileResource;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

trait Fileable
{


    /**
     * Summary of storeFile
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $location
     * @param mixed $size
     * @param mixed $removeFile
     * @param mixed $name
     * @return array{disk: array|string|null, extension: string, name: string, size: string, status: bool}
     */
    private function storeFile(
                                UploadedFile $file,
                                string $location,
                                ?string $size = null, 
                                ?File $removeFile = null,
                                ?string $name = null
                             ): array{


        $name = uniqid() . time() . '.' . $file->getClientOriginalExtension();
        $imagePath = $location . '/' . $name;
        $status = true;
        $disk = site_settings(SettingKey::STORAGE->value);
        $inputFile = $file;


        if ($removeFile) $this->unlink($location, $removeFile);

        switch ($disk) {
            case StorageKey::LOCAL->value:
                if (!file_exists($location))
                    mkdir($location, 0755, true);
                switch (substr($file->getMimeType(), 0, 5)) {
                    case 'image':
                        $image = Image::read(file_get_contents($file));
                        if (isset($size)) {
                            list($width, $height) = explode('x', strtolower($size));
                            $image->resize($width, $height);
                        }
                        $image->save($imagePath);
                        break;

                    default:

                        $file->move($location, $name);
                        break;
                }
                break;

            default:
                $configurationFn = StorageKey::getConfigurationFnName($disk );
                if($configurationFn){
                    
                    $this->{$configurationFn}();
                    \Storage::disk($disk)->putFileAs(
                        $location,
                        $file,
                        $name
                    );
                }
           
                break;
        }

        $size = 20000;

        try {
            $size = @$inputFile->getSize();
        } catch (\Throwable $th) {

        }

        return [
            'status'    => $status,
            'name'      => $name,
            'display_name'      => $file->getClientOriginalName(),
            'disk'      => $disk ,
            "size"      => $this->formatSize($size),
            "extension" => strtolower($file->getClientOriginalExtension())
        ];

    }



    /**
     * Get file size
     * 
     * @param  int|string $bytes
     * @return string
     */
    private function formatSize(string|int $bytes): string{
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
    private function unlink(string $location ,?File $file = null): bool{

          try {

            if($file){

                $fileName = $file->name;
                $disk = $file->disk;

                switch ($disk) {
                    case StorageKey::LOCAL->value:
                        if (file_exists($location . '/' .$fileName) && is_file($location . '/' . $fileName))
                            @unlink($location . '/' . $fileName);
                        break;
                    default:
                  
                        $configurationFn = StorageKey::getConfigurationFnName($disk );

                        if($configurationFn){
                            $this->{$configurationFn}();
                            if (Storage::disk($disk)->exists($location . '/' .$fileName))
                                Storage::disk($disk)->delete($location . '/' . $fileName);

                        }
                        break;
                }
                $file->delete();
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
    private function unlinkEditorFiles(
                                       array $files,
                                       string $location = GlobalConfig::FILE_PATH['text_editor']['path']
                                    ): void{
       
        try {
            collect($files)->map(function(string $file) use($location): void{
                if(file_exists(filename: $location . '/' . @$file) && is_file($location . '/' . @$file)) @unlink($location . '/' . @$file);
            });
        } catch(Throwable $th) {}
    }



    
    /**
     * Summary of getimageURL
     * @param \Modules\Settings\Models\File|FileResource|null $file
     * @param string $location
     * @param mixed $foreceSize
     * @return string
     */
    private function getimageURL(
                                File | FileResource | null $file = null, 
                                string $location ,
                                ?string $foreceSize  = null
                             ): string{
   
        $imageURL  = asset('assets/FileManager/images/default/default.jpg');

        if(!$file) return $imageURL;

        $image     = $location."/".$file->name;

        $disk = $file->disk;

        switch ($disk) {
            case StorageKey::LOCAL->value:
                if (file_exists($image) && is_file($image))
                    $imageURL = asset($image);
                break;
            default:

                $configurationFn = StorageKey::getConfigurationFnName($disk );
                
                if($configurationFn){
                    $this->{$configurationFn}();
                    if (Storage::disk($disk)->exists($image))
                    $imageURL = \Storage::disk($disk)->url($image);
                }
        }

        return $imageURL;

    }



    /**
     * Summary of downloadFile
     * @param string $location
     * @param File|null $file
     * @return JsonResponse|StreamedResponse|BinaryFileResponse|null
     */
    public function downloadFile(string $location, ?File $file = null): JsonResponse|StreamedResponse|BinaryFileResponse| \Illuminate\Http\Response |null
    {
        if (!$file)  return ApiResponse::error(
                                    ['error' => translate('File not found')],
                                    HttpResponse::HTTP_NOT_FOUND
                                );

        $filePath = $location . '/' . $file->name;

        if ($file->disk === StorageKey::LOCAL->value) {
            if (!\File::exists($filePath)) {
                return ApiResponse::error(
                    ['error' => translate('File does not exist on local disk')],
                    HttpResponse::HTTP_NOT_FOUND
                );
            }

            return response()->file($filePath, [
                'Content-Type'        => \File::mimeType($filePath),
                'Content-Disposition' => 'attachment; filename="' . $file->name . '"',
            ]);
        }

        try {

            $content = \Storage::disk($file->disk)->get($filePath);

        } catch (\Throwable $th) {
            return ApiResponse::error(
                ['error' => translate('Unable to retrieve file from storage')],
                HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        
        return response()->file($content, [
            'Content-Type'        => \Storage::disk($file->disk)->mimeType($filePath) ?? 'application/octet-stream',
            'Content-Disposition' => 'attachment; filename="' . $file->name . '"',
        ]);
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

            $model?->file?->map(fn(File $file):bool => $this->unlink(
                location    : $path,
                file        : $file
            ));
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }









    
    /**
     * Set aws configuration
     *
     * @return void
     */
    private function setAWSConfig(): void
    {

        $awsConfig = json_decode(site_settings(SettingKey::S3_CONFIGURATION->value), true);

        config(
            [
                'filesystems.disks.s3.key' => Arr::get($awsConfig, 's3_key'),
                'filesystems.disks.s3.secret' => Arr::get($awsConfig, 's3_secret'),
                'filesystems.disks.s3.region' => Arr::get($awsConfig, 's3_region'),
                'filesystems.disks.s3.bucket' => Arr::get($awsConfig, 's3_bucket'),
                'filesystems.disks.s3.use_path_style_endpoint' => false,
            ]
        );
    }



     /**
     * set ftp configuration
     *
     * @return void
     */
    public function setFTPConfig(): void
    {

        $ftpConfig = json_decode(site_settings(SettingKey::FTP_CONFIGURATION->value), true);

         config(
            [
                'filesystems.disks.ftp.host' => Arr::get($ftpConfig, 'host'),
                'filesystems.disks.ftp.username' => Arr::get($ftpConfig, 'user_name'),
                'filesystems.disks.ftp.password' => Arr::get($ftpConfig, 'password'),
                'filesystems.disks.ftp.port' => (int) Arr::get($ftpConfig, 'port'),
                'filesystems.disks.ftp.root' => Arr::get($ftpConfig, 'root')
            ]
        );

    }
}