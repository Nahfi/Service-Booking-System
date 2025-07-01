<?php

namespace Modules\Contact\Http\Services;

use Exception;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use App\Traits\Common\Fileable;
use App\Enums\Settings\FileKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Traits\Common\ModelAction;
use Modules\Contact\Models\Contact;
use App\Enums\Settings\GlobalConfig;
use modules\Contact\Enums\ChannelEnum;
use Modules\Contact\Models\ContactGroup;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactResource;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactGroupResource;

class ContactService
{
     use Fileable, ModelAction;

     // ============================== //
     // Contact crud related functions //
     // ============================== //

     /**
      * getContacts
      *
      * @param bool $isTrashed
      * 
      * @return JsonResponse
      */
     public function getContacts(bool $isTrashed = false): JsonResponse {

          $log = Contact::when($isTrashed, 
                                   fn(Builder $query): Builder 
                                        => $query->onlyTrashed())
                              ->search(['name', 'phone', 'email'])
                              ->filter(['status', 'contact_group_id', 'channel'])
                              ->date()
                              ->latest()
                              ->loadRelations(['group', 'file'])
                              ->indexQuery();

          return ApiResponse::asSuccess()
                                ->withData(resource: $log,resourceNamespace: ContactResource::class)
                                ->build();
     }

     /**
      * saveContact
      *
      * @param ContactRequest $request
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function saveContact(ContactRequest $request, string|null $uid = null): JsonResponse {

          $log = null;
          $contactGroup = null;
          $contactgroupIdentifier = $request->get('contact_group_uid');

          if($request->input("contact_group_uid")) {

               $contactGroup = ContactGroup::where("uid", $contactgroupIdentifier)
                                                  ->first();
               if(!$contactGroup) throw new Exception(translate("Invalid contact group"), Response::HTTP_FORBIDDEN);
          }

          $log = DB::transaction(function () use ($request, $uid, $contactGroup) {

               $log = Contact::updateOrCreate(
                    ['uid' => $uid],
                    [
                         'contact_group_id' => $contactGroup?->id,
                         'channel'          => $request->get('channel', ChannelEnum::ALL),
                         'name'             => $request->get('name'),
                         'phone_number'     => $request->get('phone_number'),
                         'email'            => $request->get('email'),
                         'is_favorite'      => $request->get('is_favorite', false),
                         'custom_attributes'=> $request->get('custom_attributes'),
                    ]
               );

               if($request->hasFile('image')){

                    $this->saveFile(model: $log,
                                        response: $this->storeFile(
                                                                 file: $request->file('image'), 
                                                                 location : GlobalConfig::FILE_PATH['contact']['path'], 

                                                                 removeFile: request()->isMethod('patch') ? $log->file : null),
                                        type: FileKey::AVATAR->value);
               }
               $log->load('file');
               return $log;
          });

          return ApiResponse::asSuccess()
                                ->withData(resource: $log,resourceNamespace: ContactResource::class)
                                ->build();
     }

     /**
      * deleteContact
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function deleteContact(string|null $uid = null) : JsonResponse {

          if(!$uid) throw new Exception(
                            translate('Invalid Contact'),
                            Response::HTTP_NOT_FOUND);   

          $log = Contact::where('uid', $uid)
                              ->with(['file'])
                              ->first();

          if(!$log) throw new Exception(
                            translate('Invalid Contact'),
                            Response::HTTP_NOT_FOUND);  

          DB::transaction(function () use ($log) {

               if($log->file){
                    $this->unlink(
                         location: GlobalConfig::FILE_PATH['contact']['path'],
                         file: $log->file
                    );
               }
               $log->delete();
          });

          return ApiResponse::asSuccess()
                                ->withMessage(translate("Contact deleted successfully"))
                                ->build();
     }

     // ==================================== //
     // Contact Group crud related functions //
     // ==================================== //

     /**
      * getContactGroups
      *
      * @param bool $isTrashed
      * 
      * @return JsonResponse
      */
     public function getContactGroups(bool $isTrashed = false): JsonResponse {

          $log = ContactGroup::when($isTrashed, 
                                   fn(Builder $query): Builder 
                                        => $query->onlyTrashed())
                              ->search(['name'])
                              ->filter(['status', 'channel'])
                              ->date()
                              ->latest()
                              ->loadRelations(['contacts'])
                              ->indexQuery();

          return ApiResponse::asSuccess()
                                ->withData(resource: $log,resourceNamespace: ContactResource::class)
                                ->build();
     }

     /**
      * saveContactGroup
      *
      * @param ContactGroupRequest $request
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function saveContactGroup(ContactGroupRequest $request, string|null $uid = null): JsonResponse {

          $log = ContactGroup::updateOrCreate(
               ['uid' => $uid],
               [
                    'name'                        => $request->get('name'),
                    'channel'                     => $request->get('channel', ChannelEnum::ALL->value),
                    'attribute_configurations'    => $request->get('attribute_configurations'),
               ]
          );

          return ApiResponse::asSuccess()
                                ->withData(resource: $log,resourceNamespace: ContactGroupResource::class)
                                ->build();
     }

     /**
      * deleteContactGroup
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function deleteContactGroup(string|null $uid = null) : JsonResponse {

          if(!$uid) throw new Exception(
                            translate('Invalid Contact Group'),
                            Response::HTTP_NOT_FOUND);   

          $log = ContactGroup::where('uid', $uid)
                              ->first();

          if(!$log) throw new Exception(
                            translate('Invalid Contact Group'),
                            Response::HTTP_NOT_FOUND);  

          $log->delete();

          return ApiResponse::asSuccess()
                                ->withMessage(translate("Contact Group deleted successfully"))
                                ->build();
     }


     // ================================== //
     // Additional Common Helper Functions //
     // ================================== //
}
