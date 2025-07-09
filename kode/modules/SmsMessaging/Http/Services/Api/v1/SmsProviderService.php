<?php

namespace Modules\SmsMessaging\Http\Services\Api\v1;

use Exception;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Enums\Settings\TokenKey;
use Illuminate\Http\JsonResponse;
use App\Enums\SmsMessage\TypeEnum;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Modules\SmsMessaging\Models\SmsProvider;
use Illuminate\Pagination\LengthAwarePaginator;
use Laravel\Sanctum\PersonalAccessToken;
use Modules\SmsMessaging\Models\SmsProviderDevice;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderRequest;
use Modules\SmsMessaging\Http\Resources\Api\v1\SmsProviderResource;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderDeviceRequest;
use Modules\SmsMessaging\Http\Resources\Api\v1\SmsProviderDeviceResource;

class SmsProviderService
{
     use ModelAction;

     ## ============================== ##
     ## SMS Provider related functions ##
     ## ============================== ##

     /**
      * getSmsProviders
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function getSmsProviders(string|null $uid = null): JsonResponse
     {
          $log = SmsProvider::where('user_id', parent_user()->id)
                                   ->recycle()
                                   ->search(['name'])
                                   ->filter(['status', 'type'])
                                   ->date()
                                   ->latest('id')
                                   ->withCount(['smsGateways', 'devices'])
                                   ->when($uid, 
                                        fn(Builder $query): SmsProvider | null
                                             => $query->where('uid', $uid)->firstOrFail(),
                                        fn(Builder $query): LengthAwarePaginator|Collection 
                                             => $query->fetchWithFormat());

          return ApiResponse::asSuccess()
                                   ->withData(resource: $log, resourceNamespace: SmsProviderResource::class)
                                   ->build();
     }

     /**
      * saveSmsProvider
      *
      * @param SmsProviderRequest $request
      * @param TypeEnum $providerType
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function saveSmsProvider(SmsProviderRequest $request, TypeEnum $providerType, string|null $uid = null): JsonResponse
     {
          $log = SmsProvider::updateOrCreate(
               [
                    'uid'     => $uid, 
                    'user_id' => parent_user()->id
               ],
               [
                    'name'              => $request->get('name'),
                    'type'              => $providerType->value,
                    'configuration'     => $request->get('configuration'), 
               ]
          );

          return ApiResponse::asSuccess()
                                   ->withData(resource: $log,resourceNamespace: SmsProviderResource::class)
                                   ->build();
     }

     /**
      * destroySmsProvider
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function destroySmsProvider(string|null $uid = null): JsonResponse
     {
          if (!$uid) throw new Exception(translate('Invalid SMS Provider'), Response::HTTP_NOT_FOUND);

          $log = SmsProvider::when(request()->has('is_trash'), 
                                        fn(Builder $query) => $query->onlyTrashed())
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->firstOrFail();
          
          request()->has('is_trash') ? $log->forceDelete() : $log->delete();

          return ApiResponse::asSuccess()
                              ->withMessage(translate("SMS provider " . 
                                   (request()->has('is_trash') ? 'deleted permanently' : 'removed')))
                              ->build();
     }

     
     /**
      * handleSmsProvider
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
     public function handleSmsProvider(Request $request): JsonResponse{

          $smsProviderModel   = new SmsProvider();
          $parentUser         = parent_user();

          $this->validateBulkActonRequest(request: $request, model: $smsProviderModel);
          
          $smsProvider = SmsProvider::where('user_id', $parentUser->id)
                                        ->whereIn('id', $request->input('bulk_ids'));

          $response = $this->bulkAction(request: $request, 
                                   actionData: [
                                        "model" => $smsProviderModel ,
                                        'query' =>  $smsProvider
                                   ]);
          if(!$response)
               throw new Exception(
                    translate('Something went wrong'),
                    Response::HTTP_UNAUTHORIZED);   
               

          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Bulk action completed successfully"))
                                   ->build();
     }
    

     /**
      * restoreSmsProvider
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function restoreSmsProvider(string|null $uid = null): JsonResponse {

          $log = SmsProvider::onlyTrashed()
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->firstOrFail();

          $log->restore();
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("SMS provider restored successfully"))
                                   ->build();

     }

     ## ===================================== ##
     ## SMS Provider Device related functions ##
     ## ===================================== ##

     /**
      * getSmsProviderDevices
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function getSmsProviderDevices(string|null $uid = null): JsonResponse
     {
          $log = SmsProviderDevice::recycle()
                                   ->search(['device_id', 'ip_address'])
                                   ->filter(['smsProvider:uid', 'android_version', 'status'])
                                   ->date()
                                   ->latest('id')
                                   ->with(['smsProvider', 'smsGateways'])
                                   ->when($uid, 
                                        fn(Builder $query): SmsProviderDevice | null
                                             => $query->where('uid', $uid)->firstOrFail(),
                                        fn(Builder $query): LengthAwarePaginator|Collection 
                                             => $query->fetchWithFormat());

          return ApiResponse::asSuccess()
                                   ->withData(resource: $log, resourceNamespace: SmsProviderDeviceResource::class)
                                   ->build();
     }

     /**
      * handleSmsProviderDevice
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
     public function handleSmsProviderDevice(Request $request): JsonResponse{

          $smsProviderDeviceModel  = new SmsProviderDevice();
          $this->validateBulkActonRequest(request: $request, model: $smsProviderDeviceModel);
          
          $smsProviderDeviceQuery = SmsProviderDevice::whereIn('id', $request->input('bulk_ids'));

          $response = $this->bulkAction(request: $request, 
                                   actionData: [
                                        "model" => $smsProviderDeviceModel ,
                                        'query' =>  $smsProviderDeviceQuery
                                   ]);
          if(!$response)
               throw new Exception(
                    translate('Something went wrong'),
                    Response::HTTP_UNAUTHORIZED);   
               

          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Bulk action completed successfully"))
                                   ->build();
     }

     /**
      * destroySmsProviderDevice
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function destroySmsProviderDevice(string|null $uid = null): JsonResponse
     {
          if (!$uid) throw new Exception(translate('Invalid SMS provider device'), Response::HTTP_NOT_FOUND);

          $log = SmsProviderDevice::when(request()->has('is_trash'), 
                                        fn(Builder $query) => $query->onlyTrashed())
                                        ->where('uid', $uid)
                                        ->firstOrFail();
          
          request()->has('is_trash') ? $log->forceDelete() : $log->delete();

          return ApiResponse::asSuccess()
                              ->withMessage(translate("SMS provider device" . 
                                   (request()->has('is_trash') ? 'deleted permanently' : 'removed')))
                              ->build();
     }

     /**
      * restoreSmsProviderDevice
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function restoreSmsProviderDevice(string|null $uid = null): JsonResponse {

          $log = SmsProviderDevice::onlyTrashed()
                                   ->where('uid', $uid)
                                   ->firstOrFail();

          $log->restore();

          return ApiResponse::asSuccess()
                                   ->withMessage(translate("SMS provider device restored successfully"))
                                   ->build();

     }

     ## =========================== ##
     ## Additional Helper Functions ##
     ## =========================== ##
}