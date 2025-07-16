<?php

namespace Modules\Notification\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Notification\Http\Services\GatewayNotificationService;

class GatewayNotificationController extends Controller
{
    public function __construct(protected GatewayNotificationService $gatewayNotificationService){

        $this->middleware('user.permission.check:view_user')->only(['index','show']);
        $this->middleware('user.permission.check:save_user')->only(['store', 'update', 'updateStatus']);
        $this->middleware('user.permission.check:destroy_user')->only('destroy');
    }


    /**
     * Summary of index
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
      return $this->gatewayNotificationService->getNotifications();
    }



    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
       return $this->gatewayNotificationService->getNotifications($id);
    }



    /**
     * Summary of destroy
     * @param mixed $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
       return $this->gatewayNotificationService->destroy($id);
    }



     /**
     * Summary of bulk
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public function bulk(Request $request): JsonResponse{

        return $this->gatewayNotificationService->handleBulkRequest( $request);
    }
}
