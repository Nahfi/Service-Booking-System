<?php

namespace Modules\Contact\Http\Services;

use Exception;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\Common\Fileable;
use App\Enums\Settings\FileKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Traits\Common\ModelAction;
use Modules\Contact\Models\Contact;
use App\Enums\Settings\GlobalConfig;
use Modules\Contact\Models\ContactGroup;
use Illuminate\Database\Eloquent\Collection;
use modules\Contact\Enums\ContactChannelEnum;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactResource;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactGroupResource;
use Modules\Contact\Http\Requests\Api\V1\ContactFavoriteRequest;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupAttachmentRequest;

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
     public function saveContact(ContactRequest $request, string|null $uid = null): JsonResponse
     {
          $log                = null;
          $contactGroupIds    = $request->get('contact_group_uids', []);
          $contactGroups      = ContactGroup::whereIn('uid', $contactGroupIds)->get();

          if ($contactGroupIds && $contactGroups->count() !== count($contactGroupIds)) 
               throw new Exception(translate("One or more invalid contact groups selected"), Response::HTTP_FORBIDDEN);
          

          $log = DB::transaction(function () use ($request, $uid, $contactGroups) {
               
               $log = Contact::updateOrCreate(
                    ['uid' => $uid],
                    [
                         'channel'           => $request->get('channel', ContactChannelEnum::ALL),
                         'name'              => $request->get('name'),
                         'phone_number'      => $request->get('phone_number'),
                         'email'             => $request->get('email'),
                         'is_favorite'       => $request->get('is_favorite', false),
                         'custom_attributes' => $request->get('custom_attributes'),
                    ]
               );

               if ($request->hasFile('image')) {
                    $this->saveFile(model: $log,
                         response: $this->storeFile(
                              file: $request->file('image'), 
                              location: GlobalConfig::FILE_PATH['contact']['path'], 
                              removeFile: request()->isMethod('patch') ? $log->file : null
                         ),
                         type: FileKey::AVATAR->value
                    );
               }

               $log->load('file');
               $syncIds = $contactGroups->pluck('id')->all();
               $log->contactGroups()->sync($syncIds);

               return $log;
          });

          return ApiResponse::asSuccess()
               ->withMessage(translate("Contact saved successfully"))
               ->withData(resource: $log, resourceNamespace: ContactResource::class)
               ->build();
     }

     /**
      * updateContactFavorites
      *
      * @param ContactFavoriteRequest $request
      * 
      * @return JsonResponse
      */
     public function updateContactFavorites(ContactFavoriteRequest $request): JsonResponse{

          Contact::where('user_id', parent_user()->id)
                         ->whereIn('id', $request->input('bulk_ids'))
                         ->update([
                              'is_favorite' => $request->input('value', 0) == true
                         ]);

          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Favorite status updated successfully"))
                                   ->build();
     }

     /**
      * handleContactBulkRequest
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
     public function handleContactBulkRequest(Request $request): JsonResponse{

          $contactModel    = new Contact();
          $parentUser      = parent_user();

          $this->validateBulkActonRequest(request: $request, model: $contactModel);
          
          $contacts = Contact::with(['file'])
                              ->where('user_id', $parentUser->id)
                              ->whereIn('id', $request->input('bulk_ids'));

          $response = $this->bulkAction(request: $request, 
                                   actionData: [
                                        "model" => $contactModel ,
                                        'query' =>  $contacts,
                                        "file_unlink"  => [
                                             "avatar"   =>   GlobalConfig::FILE_PATH['contact']['path']
                                        ]
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
      * updateContactGroupAttachments
      *
      * @param ContactGroupAttachmentRequest $request
      * 
      * @return JsonResponse
      */
     public function updateContactGroupAttachments(ContactGroupAttachmentRequest $request): JsonResponse
     {
          $contactIds         = $request->get('contact_ids', []);
          $contactGroupIds    = $request->get('contact_group_ids', []);

          $contacts      = Contact::whereIn('id', $contactIds)->get();
          $contactGroups = ContactGroup::whereIn('id', $contactGroupIds)->get();

          if ($contactIds && $contacts->count() !== count($contactIds)) 
               throw new Exception(translate("One or more invalid contacts selected"), Response::HTTP_FORBIDDEN);

          if ($contactGroupIds && $contactGroups->count() !== count($contactGroupIds)) 
               throw new Exception(translate("One or more invalid contact groups selected"), Response::HTTP_FORBIDDEN);

          DB::transaction(function () use ($contacts, $contactGroups) {

               $groupIds = $contactGroups->pluck('id')->all();
               $contacts->map(function ($contact) use ($groupIds) {
                    $contact->contactGroups()->sync($groupIds);
               });
          });

          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Contact group management completed"))
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
                              ->firstOrFail();

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

     /**
      * restoreContact
      *
      * @param string|null $uid
      * 
      * @return JsonResponse
      */
     public function restoreContact(string|null $uid = null): JsonResponse {

          $user = Contact::onlyTrashed()
                              ->where('uid', $uid)
                              ->firstOrFail();

          $user->restore();
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Contact restored successfully"))
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
                                        fn(Builder $query): ContactGroup | null
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
      * handleContactGroupBulkRequest
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
     public function handleContactGroupBulkRequest(Request $request): JsonResponse{

          $contactGroupModel  = new ContactGroup();
          $parentUser         = parent_user();

          $this->validateBulkActonRequest(request: $request, model: $contactGroupModel);
          
          $contactGroups = ContactGroup::where('user_id', $parentUser->id)
                                             ->whereIn('id', $request->input('bulk_ids'));

          $response = $this->bulkAction(request: $request, 
                              actionData: [
                                   "model" => $contactGroupModel,
                                   'query' => $contactGroups,
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
                                   ->firstOrFail();

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

     public function restoreContactGroup(string|null $uid = null): JsonResponse {

          $user = ContactGroup::onlyTrashed()
                                   ->where('uid', $uid)
                                   ->firstOrFail();

          $user->restore();
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Contact group restored successfully"))
                                   ->build();

     }


     ## ================================== ##
     ## Additional Common Helper Functions ##
     ## ================================== ##
}
