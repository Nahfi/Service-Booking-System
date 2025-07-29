<?php

namespace App\Traits\Common;

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
     * Summary of saveFiles
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param array $response
     * @return bool
     */
    private function saveFiles(
                                Model $model ,
                                array $responses  = [],
                                ? string $type =  null
                              ):bool
                            {


        $files = collect($responses)
                            ->map(fn (array $response, int $index) : ModelsFile =>
                                    new ModelsFile([

                                        'display_name' => Arr::get($response, 'display_name'),
                                        'name'         => Arr::get($response, 'name', 'default'),
                                        'disk'         => Arr::get($response, 'disk', 'local'),
                                        'type'         => $type,
                                        'size'         => Arr::get($response, 'size', ''),
                                        'extension'    => Arr::get($response, 'extension', ''),
                                    ])
                            );

        if (!empty($files))  $model->files()->saveMany($files);

        return true ;

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

        $expiredTime = 200; //second

        $otp               = new VerificationCode();
        $otp->otp          = $code;
        $otp->type         = strtolower($template);
        $otp->expired_at   = Carbon::now()->addSeconds($expiredTime);
        $sendTo->otp()->save($otp);
        return  $otp ;

    }


}

