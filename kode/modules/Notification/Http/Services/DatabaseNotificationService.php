<?php

namespace Modules\Notification\Http\Services;

use App\Facades\ApiResponse;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Notification\Http\Resources\DatabaseNotificationResource;
use Modules\Settings\Models\DatabaseNotification;


class DatabaseNotificationService
{

    use Fileable , ModelAction;

    /**
     * Summary of getNotifications
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function getNotifications(Model $model ,int | string | null $id =  null): JsonResponse{


        $notfications =  DatabaseNotification::date()
                            ->where('receiver_model',get_class($model))
                            ->where('reciever_id', $model->id)
                            ->latest()
                                ->when($id,fn(Builder $q):DatabaseNotification | null => $q->where('id',  $id)->firstOrfail(),
                            fn(Builder $q) : LengthAwarePaginator => $q->paginate(paginateNumber())
                                                ->appends(request()->all())
                            );


        return ApiResponse::asSuccess()
                            ->withData(
                                        resource: $notfications,
                                        resourceNamespace: DatabaseNotificationResource::class
                                    )->build();

    }


    /**
     * Summary of read
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function read(Model $model,  int | string | null $id =  null): JsonResponse{


        DatabaseNotification::where('receiver_model',get_class($model))
                            ->where('reciever_id', $model->id)
                            ->when($id , fn(Builder $q) :Builder => $q->where('id', $id) )
                            ->update(['is_read' => true]);

        return ApiResponse::asSuccess()
                            ->build();
    }



    /**
     * Summary of destroy
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param int|string $id
     * @return JsonResponse
     */
    public function destroy(Model $model,  int | string  $id ): JsonResponse{


        DatabaseNotification::where('receiver_model',get_class($model))
                            ->where('reciever_id', $model->id)
                            ->where('id', $id)
                            ->delete();

        return ApiResponse::asSuccess()
                                ->build();
    }




    /**
     * Summary of handleBulkRequest
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public function handleBulkRequest(Model $model , Request $request): JsonResponse{


        $notificationModel =  new DatabaseNotification();

        $this->validateBulkActonRequest($request ,  $notificationModel);

        $notifications = DatabaseNotification::where('receiver_model',get_class($model))
                                    ->where('reciever_id', $model->id)
                                    ->whereIn('id',$request->input('bulk_ids'));

        $response = $this->bulkAction( $request ,
                                        [
                                                        "model" => $notificationModel ,
                                                        'query' =>  $notifications
                                                    ]);
        if(!$response)
                throw new \Exception(
                            translate('Something went wrong'),
                            Response::HTTP_UNAUTHORIZED);


        return ApiResponse::asSuccess()->build();
    }




}
