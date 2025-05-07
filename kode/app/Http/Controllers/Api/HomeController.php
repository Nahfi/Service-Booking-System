<?php

namespace App\Http\Controllers\Api\Business;

use App\Facades\ApiResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Business\BusinessSettingUpdateRequest;
use App\Http\Resources\DatabaseNotificationLogResource;
use App\Http\Services\Business\HomeService;
use App\Models\DatabaseNotification;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
class HomeController extends Controller
{
    use ModelAction;

    protected ?User $user;

    public function __construct()
    {
        $this->user = getAuthUser('user:api', [
                                                            'business',
                                                            'file', 
                                                            'businessSetting', 
                                                            'businessSetting.currency', 
                                                            'businessSetting.language',
                                                            'businessSetting.category'
                                                            
                                                          ]);
    }




     /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'business.permissions:save_settings', only: ['businessSettingUpdate']),
          
        ];
    }


    /**
     * Summary of home
     * @return \Illuminate\Http\JsonResponse
     */
    public function home(): JsonResponse {

        return HomeService::getDashboardData($this->user);
    }



    /**
     * Summary of getNotifications
     * @return \Illuminate\Http\JsonResponse
     */
    public  function getNotifications(): JsonResponse{

        $business   = getBusiness($this->user);
        $notifications  =  DatabaseNotification::where('receiver_model',get_class(new User()))
                                                ->where('reciever_id', $business->id)
                                                ->unread()
                                                ->latest()
                                                ->take(10)
                                                ->get();

        $totalUnreadNotification = DatabaseNotification::where('receiver_model',get_class(new User()))
                                                ->where('reciever_id', $business->id)
                                                ->unread()
                                                ->count();

        return ApiResponse::asSuccess()
                                ->setBusiness($business)
                                ->withData([
                                    'notifications' => $notifications
                                ],[
                                    'notifications' =>  DatabaseNotificationLogResource::class,
                                ])
                                ->append('total_notifications', $totalUnreadNotification )
                                ->build();

    }




    /**
     * Summary of readNotifications
     * @return \Illuminate\Http\JsonResponse
     */
    public function readNotifications(): JsonResponse{

        
        DatabaseNotification::where('receiver_model',get_class(new User()))
                                        ->where('reciever_id',getBusiness($this->user)->id)
                                        ->unread()
                                        ->lazyById(100)
                                        ->each->update(['is_read' => true]);


        return ApiResponse::asSuccess()
                      ->build();

    }




    /**
     * Summary of readNotification
     * @param int|string $id
     * @return JsonResponse
     */
    public function readNotification(Request $request): JsonResponse{

        
        DatabaseNotification::where('receiver_model',get_class(new User()))
                                        ->where('reciever_id',getBusiness($this->user)->id)
                                        ->unread()
                                        ->where('id', $request->input("id"))
                                        ->update(['is_read' => true]);


        return ApiResponse::asSuccess()
                      ->build();

    }

    public function businessSettingUpdate(BusinessSettingUpdateRequest $request):JsonResponse {

        return HomeService::updateBusinessSetting(getBusiness($this->user), (object) $request->except('_token'));
    }
}
