<?php

namespace Modules\SmsMessaging\Http\Services\Api\v1;

use Exception;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Enums\SmsMessage\TypeEnum;
use App\Models\User;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Modules\SmsMessaging\Models\SmsGateway;
use Illuminate\Database\Eloquent\Collection;
use Modules\SmsMessaging\Models\SmsProvider;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsGatewayRequest;
use Modules\SmsMessaging\Http\Resources\Api\v1\SmsGatewayResource;
use Modules\SmsMessaging\Http\Services\Api\v1\Device\ProviderService;

class SmsGatewayService
{
     use ModelAction;

     /**
      * getSmsGateways
      *
      * @param User|SmsProvider $parent
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function getSmsGateways(User|SmsProvider $parent, string|null $uid = null): JsonResponse
     {
          $device = null;
          if($parent instanceof SmsProvider 
               && request()->header('X-Device-Fingerprint')) {
                    
               $smsProviderService = new ProviderService();
               $device = $smsProviderService->getSmsProviderDevice($parent);
          }
          $log = SmsGateway::when($parent instanceof SmsProvider, 
                                        fn(Builder $q): Builder =>
                                             $q->where('sms_provider_id', $parent->id)
                                                  ->where("sms_provider_device_id", $device->id),
                                                  fn(Builder $q): Builder =>
                                                       $q->where('user_id', $parent->id))
                                   ->recycle()
                                   ->search(['identifier', 'identifier_value'])
                                   ->filter(['status', 'type'])
                                   ->date()
                                   ->latest('id')
                                   ->when($parent instanceof User, 
                                        fn(Builder $q): Builder =>
                                             $q->with(['smsProvider', 'smsProviderDevice']))
                                   ->when($uid, 
                                        fn(Builder $query): SmsGateway | null
                                             => $query->where('uid', $uid)->firstOrFail(),
                                        fn(Builder $query): LengthAwarePaginator|Collection 
                                             => $query->fetchWithFormat());
          
          return ApiResponse::asSuccess()
                                   ->withData(resource: $log, resourceNamespace: SmsGatewayResource::class)
                                   ->build();
     }

     /**
      * saveSmsGateway
      *
      * @param User|SmsProvider $parent
      * @param SmsGatewayRequest $request
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function saveSmsGateway(User|SmsProvider $parent, SmsGatewayRequest $request, string|null $uid = null): JsonResponse
     {
          $smsProvider = $parent instanceof SmsProvider 
                              ? $parent
                              : SmsProvider::where("uid", $request->input("sms_provider_uid"))
                                                  ->first();
                                       
          if(!$smsProvider) 
               throw new Exception(translate("Invalid SMS provider"), Response::HTTP_FORBIDDEN); 

          $isProviderAndroid = $smsProvider->type == TypeEnum::ANDROID->value;
          
          if(!request()->is('api/user/v1/app/*')
               && !$uid && $isProviderAndroid)
                    throw new Exception(translate("Please connect android gateways with the mobile application"), Response::HTTP_FORBIDDEN); 
           
          if(!$isProviderAndroid && $request->has('credentials')) {

               $this->validateCredentialsAgainstConfiguration(
                    $smsProvider->configuration,
                    $request->input('credentials')
               );
          }

          $commonData = [
               'sms_provider_id'   => $smsProvider->id,
               'identifier'        => $request->get('identifier'),
               'credentials'       => $request->get('credentials'), 
               'configuration'     => is_array($request->get('configuration')) 
                                        && in_array(null, $request->get('configuration'), true)
                                        ? null
                                        : $request->get('rate_limit'), 
               'rate_limit'        => is_array($request->get('rate_limit')) 
                                        && in_array(null, $request->get('rate_limit'), true)
                                        ? null
                                        : $request->get('rate_limit')
          ];

          $androidData['identifier_value'] = $request->get('identifier_value');

          if(request()->is('api/user/v1/app/*')) {

               $androidData['sim_slot'] =  $request->get('sim_slot') 
                                             ? (int)$request->get('sim_slot')
                                             : null;
          }

          if($isProviderAndroid
               && request()->is('api/user/v1/app/*')
               && $request->header('X-Device-Fingerprint')) {
                    
               $smsProviderService = new ProviderService();
               $device = $smsProviderService->getSmsProviderDevice($smsProvider);

               if($device) {
                    $existingSimSlot = SmsGateway::where("user_id", $smsProvider->user_id)
                                                       ->where("sms_provider_id", $smsProvider->id)
                                                       ->where("sms_provider_device_id", $device->id)
                                                       ->where("sim_slot", Arr::get($androidData, "sim_slot"))
                                                       ->when($uid, 
                                                            fn(Builder $q): Builder =>
                                                                 $q->whereNot("uid", $uid))
                                                       ->exists();
                    if($existingSimSlot) throw new Exception(translate("Chosen sim slot is already occupied"), Response::HTTP_FORBIDDEN); 

                    $androidData["sms_provider_device_id"] = $device->id;
               }
          }

          $data = $isProviderAndroid 
                    ? array_merge($commonData, $androidData)
                    : $commonData; 
          
          $log = SmsGateway::updateOrCreate([
                                   'uid'     => $uid, 
                                   'user_id' => $smsProvider->user_id
                              ],  $data);

          return ApiResponse::asSuccess()
                                   ->withData(resource: $log, resourceNamespace: SmsGatewayResource::class)
                                   ->build();
     }

     /**
      * destroySmsGateway
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function destroySmsGateway(string|null $uid = null): JsonResponse
     {
          if (!$uid) throw new Exception(translate('Invalid SMS Gateway'), Response::HTTP_NOT_FOUND);

          $log = SmsGateway::when(request()->has('is_trash'), 
                                        fn(Builder $query) => $query->onlyTrashed())
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->firstOrFail();
          
          if (request()->has('is_trash')) { 

               $log->forceDelete();
          } else {

               $log->delete();
          }

          return ApiResponse::asSuccess()
                              ->withMessage(translate("SMS gateway " . 
                                   (request()->has('is_trash') ? 'deleted permanently' : 'removed')))
                              ->build();
     }

     
     /**
      * handleSmsGateway
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
     public function handleSmsGateway(Request $request): JsonResponse{

          $smsGatewayModel    = new SmsGateway();
          $parentUser         = parent_user();

          $this->validateBulkActonRequest(request: $request, model: $smsGatewayModel);
          
          $smsGateway = SmsGateway::where('user_id', $parentUser->id)
                                        ->whereIn('id', $request->input('bulk_ids'));

          $response = $this->bulkAction(request: $request, 
                                   actionData: [
                                        "model" => $smsGatewayModel ,
                                        'query' => $smsGateway
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
      * restoreSmsGateway
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function restoreSmsGateway(string|null $uid = null): JsonResponse {

          $log = SmsGateway::onlyTrashed()
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->firstOrFail();

          $log->restore();
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("SMS gateway restored successfully"))
                                   ->build();

     }

     ## =========================== ##
     ## Additional Helper Functions ##
     ## =========================== ##

     /**
      * validateCredentialsAgainstConfiguration
      *
      * @param array|null $configuration
      * @param array|null $credentials
      * 
      * @return void
      */
     protected function validateCredentialsAgainstConfiguration(array|null $configuration = null, array|null $credentials = null): void {

          $requiredParameters = Arr::get($configuration, "parameters");
          if (!$requiredParameters) return; 
     
          $credentials = $credentials ?? [];

          $missingParameters = array_diff($requiredParameters, array_keys($credentials));

          if (!empty($missingParameters)) 
               throw new Exception(
                    translate("The following required parameters are missing: ") . implode(', ', $missingParameters),
                    Response::HTTP_BAD_REQUEST
               );
     }
}