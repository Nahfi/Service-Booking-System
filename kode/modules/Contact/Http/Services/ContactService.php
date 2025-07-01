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
use modules\Contact\Enums\ContactChannelEnum;
use Modules\Contact\Models\ContactGroup;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactResource;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactGroupResource;

class ContactService
{
     use Fileable, ModelAction;

     ## ============================== ##
     ## Contact crud related functions ##
     ## ============================== ##

     /**
      * getContacts
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function getContacts(string|null $uid = null): JsonResponse {

          $log = Contact::recycle()
                              ->filter(['group:uid', 'status', 'channel'])
                              ->search(['name', 'phone', 'email'])
                              ->date()
                              ->latest()
                              ->with(['contactGroups', 'file'])
                              ->when($uid, 
                                   fn(Builder $query): Contact | null 
                                        => $query->where('uid', $uid)->firstOrFail(),
                                   fn(Builder $query): LengthAwarePaginator|Collection 
                                        => $query->fetchWithFormat());
                              
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
                         'channel'          => $request->get('channel', ContactChannelEnum::ALL),
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
      * destroyContact
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function destroyContact(string|null $uid = null) : JsonResponse {

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

               if(request()->has('is_trash')){
                    if($log->file){
                         $this->unlink(
                              location: GlobalConfig::FILE_PATH['contact']['path'],
                              file: $log->file
                         );
                    }
                    $log->forceDelete();

               } else {
               
                    $log->delete();
               }
          });

          return ApiResponse::asSuccess()
                                ->withMessage(translate("Contact deleted successfully"))
                                ->build();
     }

     ## ==================================== ##
     ## Contact Group crud related functions ##
     ## ==================================== ##

     /**
      * getContactGroups
      *
      * @param string|null|null $uid
      * 
      * @return JsonResponse
      */
     public function getContactGroups(string|null $uid = null): JsonResponse {

          $log = ContactGroup::recycle()
                                   ->search(['name'])
                                   ->filter(['status', 'channel'])
                                   ->date()
                                   ->latest()
                                   ->with(['contacts'])
                                   ->when($uid, 
                                        fn(Builder $query): Contact | null 
                                             => $query->where('uid', $uid)->firstOrFail(),
                                        fn(Builder $query): LengthAwarePaginator|Collection 
                                             => $query->fetchWithFormat());

          return ApiResponse::asSuccess()
                                ->withData(resource: $log, resourceNamespace: ContactGroupResource::class)
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
                    'channel'                     => $request->get('channel', ContactChannelEnum::ALL->value),
                    'attribute_configurations'    => $request->get('attribute_configurations'),
               ]
          );

          return ApiResponse::asSuccess()
                                ->withData(resource: $log,resourceNamespace: ContactGroupResource::class)
                                ->build();
     }

     /**
      * destroyContactGroup
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function destroyContactGroup(string|null $uid = null) : JsonResponse {

          if(!$uid) throw new Exception(
                            translate('Invalid Contact Group'),
                            Response::HTTP_NOT_FOUND);   

          $log = ContactGroup::where('uid', $uid)
                                   ->with(['contacts', 'contacts.file'])
                                   ->first();

          if(!$log) throw new Exception(
                            translate('Invalid Contact Group'),
                            Response::HTTP_NOT_FOUND);  

          if(request()->has('is_trash')) {

               if($log->contacts()->count() > 0) {
                    
                    $log->contacts()
                              ->each(function(Contact $contact) {

                         if($contact->file){
                              $this->unlink(
                                   location: GlobalConfig::FILE_PATH['contact']['path'],
                                   file: $contact->file
                              );
                         }
                         $contact->forceDelete();
                    });
               }

               
               $log->forceDelete();
          } else {
               
               $log->delete();
          }

          return ApiResponse::asSuccess()
                                ->withMessage(translate("Contact Group deleted successfully"))
                                ->build();
     }


     ## ================================== ##
     ## Additional Common Helper Functions ##
     ## ================================== ##
}
