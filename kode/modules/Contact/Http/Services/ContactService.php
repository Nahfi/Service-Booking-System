<?php

namespace Modules\Contact\Http\Services;

use Exception;
use Illuminate\Support\Arr;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Traits\Common\Fileable;
use App\Enums\Settings\FileKey;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use App\Traits\Common\ModelAction;
use Modules\Contact\Models\Contact;
use App\Enums\Settings\GlobalConfig;
use Maatwebsite\Excel\Facades\Excel;
use App\Enums\Contact\ContactJobEnum;
use Modules\Contact\Models\ContactGroup;
use Modules\Contact\Models\ContactImport;
use App\Enums\Contact\ContactChannelEnum;
use Illuminate\Database\Eloquent\Collection;
use Modules\Contact\Imports\RowCountImporter;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Contact\Models\ContactImportFailure;
use Modules\Contact\Models\ContactGroupDeletion;
use Modules\Contact\Imports\ContactImportHandler;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Modules\Contact\Jobs\Api\v1\ProcessContactImportJob;
use Modules\Contact\Jobs\Api\v1\ProcessContactGroupDeletionJob;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactResource;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;
use Modules\Contact\Http\Requests\Api\V1\ContactImportRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactGroupResource;
use Modules\Contact\Http\Requests\Api\V1\ContactFavoriteRequest;
use Modules\Contact\Http\Resources\Api\V1\ContactImportResource;
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
                              ->where('user_id', parent_user()->id)
                              ->filter(['status', 'channel', 'is_favorite'])
                              ->search(['name', 'phone_number', 'email'])
                              ->date()
                              ->latest('id')
                              ->with(['contactGroups:id,uid,name','file:fileable_id,name,disk'])
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
          $contactGroupIds    = $request->get('contact_group_ids', []);
          $contactGroups      = ContactGroup::where('user_id', parent_user()->id)
                                                  ->whereIn('id', $contactGroupIds)
                                                  ->get();

          if ($contactGroupIds && $contactGroups->count() !== count($contactGroupIds))
               throw new Exception(translate("One or more invalid contact groups selected"), Response::HTTP_FORBIDDEN);


          $log = DB::transaction(function () use ($request, $uid, $contactGroups) {

               $log = Contact::updateOrCreate(['uid' => $uid,
                         'user_id' => parent_user()->id
                    ], [
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

          $contacts      = Contact::where('user_id', parent_user()->id)
                                        ->whereIn('id', $contactIds)
                                        ->get();
          $contactGroups = ContactGroup::where('user_id', parent_user()->id)
                                             ->whereIn('id', $contactGroupIds)
                                             ->get();

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

          $log = Contact::when(request()->has('is_trash'),
                                   fn(Builder $query) => $query->onlyTrashed())
                              ->where('user_id', parent_user()->id)
                              ->where('uid', $uid)
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
                                   ->where('user_id', parent_user()->id)
                                   ->search(['name'])
                                   ->filter(['status', 'channel'])
                                   ->date()
                                   ->latest('id')
                                   ->withCount(['contacts', 'contactImports'])
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
               ['uid' => $uid,
                    'user_id' => parent_user()->id
               ],
               [
                    'name'                        => $request->get('name'),
                    'channel'                     => $request->get('channel', ContactChannelEnum::ALL->value),
                    'attribute_configurations'    => $request->get('attribute_configurations'), //todo:Discuss about it's feature
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
     public function destroyContactGroup(string|null $uid = null): JsonResponse
     {
          if (!$uid) throw new Exception(translate('Invalid Contact Group'), Response::HTTP_NOT_FOUND);

          $log = ContactGroup::when(request()->has('is_trash'),
                                        fn(Builder $query) => $query->onlyTrashed())
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->with(['contactImports', 'contactImports.failures', 'contactImports.file', 'contacts', 'contacts.file'])
                                   ->firstOrFail();
          $immediateDelete = false;


          if (request()->has('is_trash')) {

               if (request()->has('detach_contacts')) {

                    if ($log->contacts()->count() > 0) $log->contacts()->detach();
                    $log->forceDelete();
               } else {
                    $immediateDelete = request()->input('immediate_delete', false);
                    $this->{$immediateDelete ? "deleteContactGroupAndContacts" : "scheduleContactGroupDeletion"}($log);
               }
               $log->contactImports()
                    ->each(function ($import) {

                    $import?->failures()?->delete();
                    $import?->file()?->delete();
                    ProcessContactImportJob::deleteJob($import->id);
                    $import->delete();
               });
          } else {

               $log->delete();
          }

          return ApiResponse::asSuccess()
                              ->withMessage(translate("Contact Group " .
                                   (request()->has('is_trash') && !request()->has('detach_contacts')
                                   ? ($immediateDelete ? 'deletion completed' : 'deletion initiated')
                                   : (request()->has('detach_contacts') ? 'contacts detached' : 'deleted')) . " successfully"))
                              ->build();
     }

     /**
      * restoreContactGroup
      *
      * @param string|null|null $uid
      *
      * @return JsonResponse
      */
     public function restoreContactGroup(string|null $uid = null): JsonResponse {

          $log = ContactGroup::onlyTrashed()
                                   ->where('user_id', parent_user()->id)
                                   ->where('uid', $uid)
                                   ->firstOrFail();

          $log->restore();
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Contact group restored successfully"))
                                   ->build();

     }

     ## ===================================== ##
     ## Contact Import crud related functions ##
     ## ===================================== ##

     /**
      * getContactImports
      *
      * @param string|int|null $id
      *
      * @return JsonResponse
      */
     public function getContactImports(string|int|null $id = null): JsonResponse {

          $log = ContactImport::where('user_id', parent_user()->id)
                                   ->filter(['contactGroups:uid', 'status', 'is_paused'])
                                   ->date()
                                   ->latest('id')
                                   ->with(['contactGroups:id,uid,name'])
                                   ->when($id,
                                        fn(Builder $query): ContactImport | null
                                             => $query->where('id', $id)->firstOrFail(),
                                        fn(Builder $query): LengthAwarePaginator|Collection
                                             => $query->fetchWithFormat());

          return ApiResponse::asSuccess()
                                ->withData(resource: $log, resourceNamespace: ContactImportResource::class)
                                ->build();
     }

     /**
      * importContacts
      *
      * @param ContactImportRequest $request
      *
      * @return JsonResponse
      */
     public function importContacts(ContactImportRequest $request): JsonResponse {

          $import = $this->createImportRecord($request);
          if(!$import) throw new Exception(translate("Failed to create import record"), Response::HTTP_UNPROCESSABLE_ENTITY);

          if ($request->hasFile('file')) {
               $fileResponse = $this->storeFile(
                    file: $request->file('file'),
                    location: GlobalConfig::FILE_PATH['contact_imports']['path']
               );
               $this->saveFile(
                    model: $import,
                    response: $fileResponse,
                    type: FileKey::CONTACT_IMPORT_FILE->value);
          }

          $import->load('file');
          if ($request->input('immediate_import', false)) {
               $this->processImmediateImport($import, $request->get('include_first_row', false), $request->get('column_map', []));
               $this->removeImportFile($import);

          } else {
               ProcessContactImportJob::dispatch(
                    $import,
                    $request->get('include_first_row', false),
                                   $request->get('column_map', []))
                    ->onQueue('imports');
          }
          return ApiResponse::asSuccess()
                                   ->withMessage(translate("Import contacts request received, please check the import status for the progress."))
                                   ->build();
     }

     /**
      * pauseResumeImport
      *
      * @param int|string|null $id
      *
      * @return JsonResponse
      */
     public function pauseResumeImport(int|string|null $id = null): JsonResponse
     {
          if(!$id) throw new Exception(translate("Invalid contact import log"), Response::HTTP_NOT_FOUND);

          $import = ContactImport::where('user_id', parent_user()->id)
                                        ->where('id', $id)
                                        ->firstOrFail();

          $newPausedState = !$import->is_paused;
          $this->handleImportPause($import, $newPausedState);

          return ApiResponse::asSuccess()
               ->withMessage(translate("Import " . ($newPausedState ? 'paused' : 'resumed') . " successfully"))
               ->build();
     }

     /**
      * destroyImport
      *
      * @param int|string|null $id
      *
      * @return JsonResponse
      */
     public function destroyImport(int|string|null $id = null): JsonResponse
     {
          if(!$id) throw new Exception(translate("Invalid contact import log"), Response::HTTP_NOT_FOUND);
          $import = ContactImport::when(request()->has('is_trash'),
                                        fn(Builder $query) => $query->onlyTrashed())
                                        ->where('user_id', parent_user()->id)
                                        ->where('id', $id)
                                        ->firstOrFail();

          DB::transaction(function () use ($import) {

               $this->removeImportFile($import);
               ContactImportFailure::where('contact_import_id', $import->id)->delete();
               $import->contactGroups()->detach();
               ProcessContactImportJob::deleteJob($import->id);
               $import->delete();
          });

          return ApiResponse::asSuccess()
                              ->withMessage(translate("Import deleted successfully"))
                              ->build();
     }

     ## =========================== ##
     ## Additional Helper Functions ##
     ## =========================== ##

     /**
      * createImportRecord
      *
      * @param ContactImportRequest $request
      *
      * @return ContactImport
      */
     private function createImportRecord(ContactImportRequest $request): ContactImport|null
     {
          $contactGroupIds    = $request->get('contact_group_ids', []);
          $contactGroups      = ContactGroup::where('user_id', parent_user()->id)
                                                  ->whereIn('id', $contactGroupIds)->get();

          if ($contactGroupIds && $contactGroups->count() !== count($contactGroupIds))
               throw new Exception(translate("One or more invalid contact groups selected"), Response::HTTP_FORBIDDEN);

          $import = DB::transaction(function () use ($request, $contactGroups) {

               $import = ContactImport::create([
                    'user_id'           => parent_user()->id,
                    'column_map'        => $request->get('column_map'),
                    'status'            => ContactJobEnum::PENDING->value,
                    'is_paused'         => false,
                    'include_first_row' => $request->get('include_first_row', false),
                    'total_rows'        => $this->countTotalRows($request->file('file'), $request->get('include_first_row', false)),
               ]);

               if ($contactGroups->isNotEmpty())
                    $import->contactGroups()->attach($contactGroups->pluck('id')->all());


               return $import;
          });

          return $import;
     }

     /**
      * countTotalRows
      *
      * @param UploadedFile $file
      * @param bool $includeFirstRow
      *
      * @return int
      */
     private function countTotalRows(UploadedFile $file, bool $includeFirstRow = false): int
     {
          $importer = new RowCountImporter();
          $rows     = Excel::toArray($importer, $file)[0] ?? [];
          return count($rows) - ($includeFirstRow ? 0 : 1);
     }

     /**
      * processImmediateImport
      *
      * @param ContactImport $import
      * @param bool $includeFirstRow
      * @param array $columnMap
      *
      * @return void
      */
     public function processImmediateImport(ContactImport $import, bool $includeFirstRow, array $columnMap): void
     {
          $this->updateImportStatus(
               import: $import,
               totalRows: $import->total_rows,
               importedRows: 0,
               failedRows: 0);

          $location = GlobalConfig::FILE_PATH['contact_imports']['path'];

          Excel::import(
               import: new ContactImportHandler(
                              import: $import,
                              includeFirstRow: $includeFirstRow,
                              columnMap: $columnMap,
                              service: $this),
               filePath: storage_path("../../$location"."/".$import->file->name));
     }

     /**
      * updateImportStatus
      *
      * @param ContactImport $import
      * @param int|null $totalRows
      * @param int|null $importedRows
      * @param int|null $failedRows
      *
      * @return void
      */
     public function updateImportStatus(ContactImport $import, int|null $totalRows = null, int|null $importedRows = null, int|null $failedRows = null): void
     {
          $import->update([
               'total_rows'        => $totalRows ?? $import->total_rows ?? 0,
               'imported_rows'     => $importedRows ?? $import->imported_rows ?? 0,
               'failed_rows'       => $failedRows ?? $import->failed_rows ?? 0,
               'status'            => ($failedRows ?? $import->failed_rows ?? 0) > 0
                                        ? ContactJobEnum::FAILED->value
                                        : (($importedRows ?? $import->imported_rows ?? 0) >= ($totalRows ?? $import->total_rows ?? 0)
                                             ? ContactJobEnum::COMPLETED->value
                                             : ContactJobEnum::PROCESSING->value),
          ]);
     }

     /**
      * mapImportRow
      *
      * @param array $row
      * @param array $columnMap
      * @param bool $includeFirstRow
      * @param array|null|null $headerData
      *
      * @return array
      */
     public function mapImportRow(array $row, array $columnMap, bool $includeFirstRow, array|null $headerData = null): array
     {
          $data = [
               'name'              => null,
               'email'             => null,
               'phone_number'      => null,
               'custom_attributes' => null,
          ];

          collect($columnMap)->each(function ($field, $index) use ($row, &$data) {
               $value = Arr::get($row, $index);
               if ($value !== null) {
                    if (in_array($field, ['name', 'email', 'phone_number'])) {
                         $data[$field] = $value;
                    }
                    // else {
                    //      $data['custom_attributes'][$field] = $value;
                    // }
               }
          });

          if (!$includeFirstRow) {
               collect($row)->each(function ($value, $index) use ($headerData, $columnMap, &$data) {
                    if ($value !== null && !array_key_exists($index, $columnMap)) {
                         $data['custom_attributes'][Arr::get($headerData, $index, "data")] = $value;
                    }
               });
          }

          return $data;
     }

     /**
      * syncContactGroups
      *
      * @param Contact $contact
      * @param ContactImport $import
      *
      * @return void
      */
     public function syncContactGroups(Contact $contact, ContactImport $import): void
     {
          $groupIds = $import->contactGroups()->pluck('contact_groups.id')->all();
          $contact->contactGroups()->sync($groupIds);
     }

     /**
      * logImportFailure
      *
      * @param ContactImport $import
      * @param int $rowNumber
      * @param array $row
      * @param string $error
      *
      * @return void
      */
     public function logImportFailure(ContactImport $import, int $rowNumber, array $row, string $error): void
     {
          dd($error);
          ContactImportFailure::create([
               'contact_import_id' => $import->id,
               'row_number'        => $rowNumber,
               'row_data'          => $row,
               'error'             => $error,
          ]);
     }

     /**
      * processImportChunk
      *
      * @param ContactImport $import
      * @param bool $includeFirstRow
      * @param array $columnMap
      * @param int|null $startRow
      *
      * @return void
      */
     public function processImportChunk(ContactImport $import, bool $includeFirstRow, array $columnMap, int|null $startRow = 0): void {

          $this->updateImportStatus(
               import: $import,
               totalRows: $import->total_rows,
               importedRows: $import->imported_rows,
               failedRows: $import->failed_rows);

          $location = GlobalConfig::FILE_PATH['contact_imports']['path'];
          Excel::import(
               import: new ContactImportHandler(
                         import: $import,
                         includeFirstRow: $includeFirstRow,
                         columnMap: $columnMap,
                         service: $this,
                         startRow: $startRow),
               filePath: storage_path("../../$location"."/".$import->file->name));
     }

     /**
      * handleImportPause
      *
      * @param ContactImport $import
      * @param bool $paused
      *
      * @return void
      */
     public function handleImportPause(ContactImport $import, bool $paused): void
     {
          if ($paused && !$import->is_paused) {
               ProcessContactImportJob::deleteJob($import->id);
          } elseif (!$paused && $import->is_paused) {
               ProcessContactImportJob::dispatch($import, $import->include_first_row, $import->column_map, $import->imported_rows + 1)
                    ->onQueue('imports');
          }
          $import->update(['is_paused' => $paused]);
     }

     /**
      * deleteContactGroupAndContacts
      *
      * @param ContactGroup $contactGroup
      * @param ContactGroupDeletion|null $contactGroupDeletion
      *
      * @return void
      */
     public function deleteContactGroupAndContacts(ContactGroup $contactGroup, ContactGroupDeletion|null $contactGroupDeletion = null): void
     {
          $contacts = $contactGroupDeletion
                         ? $contactGroup->contacts()->limit(1000)->get()
                         : $contactGroup->contacts;

          DB::transaction(function () use ($contactGroup, $contacts, $contactGroupDeletion): void {

               $contactIds = $contacts->pluck('id')->toArray();
               $contactGroup->contacts()->detach($contactIds);

               $groupCounts = DB::table('contact_group_contacts')
                                   ->join('contact_groups', 'contact_group_contacts.contact_group_id', '=', 'contact_groups.id')
                                   ->whereIn('contact_group_contacts.contact_id', $contactIds)
                                   ->whereNull('contact_groups.deleted_at')
                                   ->groupBy('contact_group_contacts.contact_id')
                                   ->select('contact_group_contacts.contact_id', DB::raw('count(*) as group_count'))
                                   ->pluck('group_count', 'contact_id')
                                   ->toArray();

               collect($contacts)
                    ->each(function ($contact) use ($contactGroupDeletion, $groupCounts) {

                    $remainingGroups = Arr::get($groupCounts, $contact->id, 0);
                    if ($remainingGroups === 0) {

                         if ($contact->file) {
                              $this->unlink(
                                   location: GlobalConfig::FILE_PATH['contact']['path'],
                                   file: $contact->file);
                         }
                         $contact->forceDelete();
                    }
                    if ($contactGroupDeletion) $contactGroupDeletion->increment('processed_contacts');
               });

               if (!$contactGroupDeletion
                    || ($contactGroupDeletion
                         && $contactGroupDeletion->processed_contacts >= $contactGroupDeletion->total_contacts)) $contactGroup->forceDelete();

          });
    }

     /**
      * scheduleContactGroupDeletion
      *
      * @param ContactGroup $contactGroup
      *
      * @return void
      */
     private function scheduleContactGroupDeletion(ContactGroup $contactGroup): void
     {
          $totalContacts = $contactGroup->contacts()->count();
          $contactGroupDeletion   = ContactGroupDeletion::create([
               'contact_group_id'  => $contactGroup->id,
               'total_contacts'    => $totalContacts,
               'status'            => ContactJobEnum::PENDING->value,
          ]);

          ProcessContactGroupDeletionJob::dispatch($contactGroup, $contactGroupDeletion)
                                             ->onQueue('deletions')
                                             ->delay(now()->addSeconds(5));
     }

     /**
      * removeImportFile
      *
      * @param ContactImport $import
      *
      * @return void
      */
     public function removeImportFile(ContactImport $import): void
     {
          if ($import->file) {
               $this->unlink(
                    location: GlobalConfig::FILE_PATH['contact_imports']['path'],
                    file: $import->file
               );
          }
     }
}
