<?php

namespace Modules\Notification\Http\Services;

use App\Facades\ApiResponse;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Notification\Http\Resources\GatewayNotificationResource;
use Modules\Settings\Models\DatabaseNotification;
use Modules\Settings\Models\NotificationLog;
use Modules\Settings\Models\Settings;

class GatewayNotificationService
{

    use Fileable , ModelAction;


    /**
     * Summary of getNotifications
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function getNotifications(int | string | null $id =  null): JsonResponse{

        $notfications =  NotificationLog::with(['receiver','receiver.file','gateway'])
                            ->date()
                            ->search(['receiver:name','receiver:email'])
                            ->filter(['status'])
                            ->latest()
                            ->whereIn('gateway_id',self::getNotificationGatewayIds())
                            ->when($id,fn(Builder $q):DatabaseNotification | null => $q->where('id',  $id)->firstOrfail(),
                            fn(Builder $q) : LengthAwarePaginator => $q->paginate(paginateNumber())
                                                ->appends(request()->all())
                            );


        return ApiResponse::asSuccess()
                            ->withData(
                                        resource: $notfications,
                                        resourceNamespace: GatewayNotificationResource::class
                                    )->build();

    }




    /**
     * Summary of destroy
     * @param int|string $id
     * @return JsonResponse
     */
    public function destroy(int | string  $id ): JsonResponse{


        NotificationLog::whereIn('gateway_id',self::getNotificationGatewayIds())
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
    public function handleBulkRequest( Request $request): JsonResponse{


        $notificationModel =  new NotificationLog();

        $this->validateBulkActonRequest($request ,  $notificationModel);

        $notifications = NotificationLog::whereIn('gateway_id',self::getNotificationGatewayIds())
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



    /**
     * Summary of getNotificationGatewayIds
     * @return array
     */
    private static function getNotificationGatewayIds():array{
        return Settings::notificationGateway()->pluck('id')->toArray();
    }




}
