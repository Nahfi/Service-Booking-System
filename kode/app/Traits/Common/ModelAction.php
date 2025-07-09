<?php

namespace App\Traits\Common;

use App\Enums\Common\Status;
use App\Enums\Settings\BulkActionType;
use App\Facades\ApiResponse;
use App\Traits\Common\Fileable as CommonFileable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule as ValidationRule;
use Illuminate\Validation\ValidationException;
use Modules\Settings\Models\File as ModelsFile;
use Modules\User\Models\VerificationCode;
use Modules\Settings\Models\File;

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
     * Bulk action update/delete
     *
     * @param Request $request
     * @param array $actionData
     * @return bool
     */
    private function bulkAction(Request $request,array $actionData): bool{

        $type     = $request->input("type");

        $bulkIds  = $request->input('bulk_ids');

        $modelQuery = Arr::get($actionData,'query',null);

        $model = $modelQuery ??  Arr::get($actionData,'model')::whereIn('id', $bulkIds);

        $type = $request->input("type");


        switch($type) {
            case BulkActionType::STATUS->value:
                $model->recycle()
                    ->lazyById(100)
                    ->each->update([BulkActionType::STATUS->value => $request->input('value')]);
                break;

            default:

                $model->when(in_array($type, [BulkActionType::RESTORE->value,BulkActionType::FORCE_DELETE->value]),
                    fn (Builder $q) :Builder => $q->onlyTrashed())
                    ->withCount(Arr::get($actionData, 'with_count', []))
                    ->with(Arr::get($actionData, 'with', []))
                    ->cursor()
                    ->each(function (Model $record) use ($type,$actionData) :void {
                        switch ($type) {
                            case BulkActionType::RESTORE->value:
                                $record->restore();
                                break;
                            case BulkActionType::FORCE_DELETE->value:
                                $this->handleForceDelete($record, $actionData);
                                break;
                            default:
                                $this->handleDefaultDelete($record, $actionData);
                                break;
                        }
                    });
                break;
        }

        return true ;

    }




    /**
     * Summary of validateBulkActonRequest
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Database\Eloquent\Model $model
     * @throws \Illuminate\Validation\ValidationException
     * @return void
     */
    public function validateBulkActonRequest(Request $request,Model $model): void{

        $tableName = $model->getTable();

        $validator = Validator::make($request->all(), rules: [
                        'bulk_ids'    => ['required' ,'array'],
                        'bulk_id.*'   => ["required",'exists:'.$tableName.',id'],
                        'type'        => ['required', ValidationRule::in(BulkActionType::toArray())],
                        'value'       => [
                            ValidationRule::requiredIf(fn () :bool => in_array($request->get("type"),[BulkActionType::STATUS->value])),
                            function (string $attribute, mixed $value, $fail) use ($request) {
                                if (in_array($request->get("type"),[BulkActionType::STATUS->value]) && !in_array($value, Status::getValues())) $fail("The {$attribute} is invalid.");
                            },
                        ]

                    ]);




        if ($validator->fails())  throw new ValidationException(validator: $validator,  response: ApiResponse::error(
                                                                    data: ['errors' => $validator->errors()],
                                                                    code: Response::HTTP_BAD_REQUEST
                                                                ));

    }




    /**
     * Summary of handleForceDelete
     * @param mixed $record
     * @param array $actionData
     * @return void
     */
    private function handleForceDelete(mixed $record, array $actionData) :void {

        $this->unlinkData($record , $actionData);
        $record->forceDelete();
    }





        /**
     * Unlink and delete relational data
     *
     * @param Model $record
     * @param array $modelData
     * @return void
     */
    private function unlinkData(Model $record , array $modelData): void{

        $fileTypes =  collect(Arr::get($modelData ,'file_unlink',[] ));
        $relations =  collect(Arr::get($modelData ,'with',[] ));


        //unlink files
        $fileTypes->each(fn(string $path , string $type ):bool =>
                            $record->file()->where('type',$type)->each(fn(File $file):bool =>
                                                               $this->unlink(location: $path,file:$file)));

        //delete data
        $relations->filter(fn(string $relation) : bool => $relation !=  'file'
                 )->each(function(string $relation) use ($record): void{
                            if($relation != 'file')  $record->{$relation}()->delete();
                        });


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

        $expiredTime = 200;

        $otp               = new VerificationCode();
        $otp->otp          = $code;
        $otp->type         = strtolower($template);
        $otp->expired_at   = Carbon::now()->addSeconds($expiredTime);
        $sendTo->otp()->save($otp);
        return  $otp ;

    }




}
