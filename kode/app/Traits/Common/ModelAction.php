<?php

namespace App\Traits\Common;

use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Traits\Common\Fileable as CommonFileable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Modules\Settings\Models\File as ModelsFile;
use Modules\User\Models\VerificationCode;

trait ModelAction
{

    use CommonFileable;


    /**
     * Change a model status
     *
     * @param array $request
     * @param array $modelData
     * @return JsonResponse
     */
    private function changeStatus(array $request ,array $actionData): JsonResponse{

        try {
            $data = Arr::get(array: $actionData,key: 'model')::where(Arr::get(array: $actionData,key: 'filterable_attributes',default: []))
                   ->when(Arr::get(array: $actionData,key: 'recycle',default: false) ,
                         fn(Builder $q) :Builder => $q->withTrashed())
                   ->firstOrfail();
            $data->{Arr::get(array: $actionData,key: 'column',default: 'status')} =  Arr::get(array: $request,key: 'value');

            $data->save();
            return ApiResponse::asSuccess()->build();

        } catch (\Exception $ex) {
            throw new \Exception($ex->getMessage());
        }
    }




    /**
     * Summary of handleForceDelete
     * @param mixed $record
     * @param array $actionData
     * @return void
     */
    private function handleForceDelete(mixed $record, array $actionData) :void {

        if(isset($actionData['force_flag'])) $this->unlinkData($record , $actionData);
        $record->forceDelete();
    }
    
   

  
    

    /**
     * Summary of handleDefaultDelete
     * @param \Illuminate\Database\Eloquent\Model $record
     * @param array $actionData
     * @return void
     */
    private function handleDefaultDelete(Model $record, array $actionData): void{
        if (!in_array(needle: true, haystack: array_map(callback: fn (string $relation) :bool => 
        $record->{$relation . "_count"} > 0
        , array: Arr::get(array: $actionData, key: 'with_count', default: [])))) {
             if(!isset($actionData['force_flag'])) $this->unlinkData($record , $actionData);
             $record->delete();
        }
    }






    /**
     * Summary of saveFile
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param mixed $response
     * @param mixed $type
     * @return bool|ModelsFile
     */
    private function saveFile(Model $model ,
                              ? array $response  = null , 
                              ? string $type =  null
                              ):mixed
                            {

    
        if(is_array($response) && Arr::has($response,'status')){
            
            $file = new ModelsFile([

                'display_name' => Arr::get($response, 'display_name'),
                'name'         => Arr::get($response, 'name', 'default'),
                'disk'         => Arr::get($response, 'disk', 'local'),
                'type'         => $type,
                'size'         => Arr::get($response, 'size', ''),
                'extension'    => Arr::get($response, 'extension', ''),
                
            ]);
            

            $model->file()->save($file);

            return $file;
        }

        return false;
    }






    /**
     * Summary of saveOTP
     * @param \Illuminate\Database\Eloquent\Model $sendTo
     * @param string $template
     * @param bool $delete
     * @return VerificationCode
     */
    private function saveOTP(Model $sendTo , string $template , bool $delete = false): VerificationCode{


        $type =  strtolower($template);
        
        if($delete) $sendTo->otp()
                             ->where('type', $type)
                             ->delete();

        $code = generateOTP();

        $expiredTime = (int) site_settings(SettingKey::OTP_EXPIRED_IN->value,20);

        $otp               = new VerificationCode();
        $otp->otp          = $code;
        $otp->type         = strtolower($template);
        $otp->expired_at   = Carbon::now()->addSeconds($expiredTime);
        $sendTo->otp()->save($otp);

        return  $otp ;

    }


}