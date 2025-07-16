<?php

namespace Modules\Settings\Http\Services;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use App\Traits\Common\Notify;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Settings\Http\Resources\NotificationGatewayResource;
use Modules\Settings\Models\Settings;

class FirebaseGatewayService
{

    use Fileable , ModelAction , Notify;

    /**
     * Summary of getGateways
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function getGateways(int | string | null $id = null): JsonResponse{


        $firebaseGateways = Settings::firebaseGateway()
                                ->when($id,fn(Builder $q):Settings | null => $q->where('id',  $id)->firstOrfail(),
                                         fn(Builder $q): Collection => $q->get()
                                );


        return ApiResponse::asSuccess( )
                            ->withData(resource: $firebaseGateways,resourceNamespace: NotificationGatewayResource::class )
                            ->build();
    }



    /**
     * Summary of save
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public  function save(Request $request): JsonResponse{


        $key = $request->input('name');
        $credential = $request->input('credential');

        $gatewayId = $request->input('id');

        $firebaseGateway = $gatewayId
                                ? Settings::firebaseGateway()->where('id', $gatewayId)
                                              ->firstOrfail()
                                : new Settings();

        $firebaseGateway->group     = SettingKey::NOTIFICATION_GATEWAY->value;
        $firebaseGateway->sub_group = SettingKey::FIREBASE_GATEWAY->value;

        $firebaseGateway->key        = $key;
        $firebaseGateway->status     = Status::ACTIVE;
        $firebaseGateway->value      = $credential;
        $firebaseGateway->is_default = $firebaseGateway?->is_default ??  false ;
        $firebaseGateway->save();

        return ApiResponse::asSuccess()
                             ->withData(resource: $firebaseGateway,resourceNamespace: NotificationGatewayResource::class )
                             ->build();

    }


    /**
     * Summary of setDefaultGateway
     * @param int|string $id
     * @return JsonResponse
     */
    public function setDefaultGateway(int | string $id): JsonResponse{


        $firebaseGateway = Settings::firebaseGateway()
                                ->where('id',$id)
                                ->firstOrFail();

        $firebaseGateway->is_default = true;
        $firebaseGateway->save();

        Settings::firebaseGateway()
                    ->where( 'id','!=',$firebaseGateway->id)
                    ->update(['is_default' => false]);

        return ApiResponse::asSuccess()
                                ->build();
    }


    /**
     * Summary of destroy
     * @param int|string $id
     * @return JsonResponse
     */
    public function destroy(int | string $id): JsonResponse{

        $firebaseGateway = Settings::firebaseGateway()
                                        ->where('id',$id)
                                        ->firstOrFail();
        $firebaseGateway->delete();
        return ApiResponse::asSuccess()
                                ->build();
    }







}
