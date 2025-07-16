<?php

namespace Modules\Notification\Http\Controllers\Api\V1;

use App\Models\User;

use Illuminate\Routing\Controller;
use Modules\Notification\Http\Services\DatabaseNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DatabaseNotificationController extends Controller
{

    public function __construct(
                                  protected DatabaseNotificationService $databaseNotificationService ,
                                  protected User | null $authUser =  null
                                 ){
                                    $this->authUser = getAuthUser();
                                  }


    /**
     * Summary of index
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
      return $this->databaseNotificationService->getNotifications($this->authUser);
    }


    /**
     * Summary of read
     * @param \Illuminate\Http\Request $request
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function read(Request $request ,  int | string | null $id = null): JsonResponse{
      return $this->databaseNotificationService->read($this->authUser , $id);
    }







    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
       return $this->databaseNotificationService->getNotifications($this->authUser , $id);
    }



    /**
     * Summary of destroy
     * @param mixed $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
       return $this->databaseNotificationService->destroy($this->authUser , $id);
    }



     /**
     * Summary of bulk
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public function bulk(Request $request): JsonResponse{

        return $this->databaseNotificationService->handleBulkRequest( $this->authUser , $request);
    }


}
