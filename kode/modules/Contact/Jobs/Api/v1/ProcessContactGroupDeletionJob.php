<?php

namespace Modules\Contact\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Enums\Contact\ContactJobEnum;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Models\ContactGroup;
use Modules\Contact\Models\ContactGroupDeletion;

class ProcessContactGroupDeletionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $contactGroup;
    protected $deletionJob;

    public function __construct(ContactGroup $contactGroup, ContactGroupDeletion $deletionJob)
    {
        $this->contactGroup = $contactGroup;
        $this->deletionJob  = $deletionJob;
    }

    /**
     * handle
     *
     * @param ContactService $service
     * 
     * @return void
     */
    public function handle(ContactService $service): void
    {
        if ($this->deletionJob->status === ContactJobEnum::FAILED->value 
            || $this->deletionJob->status === ContactJobEnum::COMPLETED->value) return;
        
        $this->deletionJob->update(['status' => ContactJobEnum::PROCESSING->value]);

        $service->deleteContactGroupAndContacts($this->contactGroup, true, $this->deletionJob);

        if ($this->deletionJob->processed_contacts < $this->deletionJob->total_contacts) {

            self::dispatch($this->contactGroup, $this->deletionJob)
                    ->onQueue('deletions')
                    ->delay(now()->addSeconds(5));
        } else {

            $this->deletionJob->update(['status' => ContactJobEnum::COMPLETED->value]);
        }
    }

    /**
     * deleteJob
     *
     * @param int $groupId
     * 
     * @return void
     */
    public static function deleteJob(int $importId): void
    {
        $job = DB::table('jobs')
            ->where('queue', 'imports')
            ->where('payload', 'like', '%"Modules\\\\Contact\\\\Models\\\\ContactImport"%')
            ->where('payload', 'like', '%"id";i:' . $importId . ';%')
            ->first();
        if ($job) {
            DB::table('jobs')->where('id', $job->id)->delete();
            return;
        }

        $jobs = DB::table('jobs')
            ->where('queue', 'imports')
            ->where('payload', 'like', '%ProcessContactImportJob%')
            ->get();

        foreach ($jobs as $job) {
            $payload = json_decode($job->payload, true);
            
            if (isset($payload['data']['command'])) {

                $command = unserialize($payload['data']['command']);
                
                if (isset($command->import) && 
                    isset($command->import->id) && 
                    $command->import->id == $importId) {
                    
                    DB::table('jobs')->where('id', $job->id)->delete();
                    return;
                }
            }
        }
    }
}