<?php

namespace Modules\Contact\Jobs\Api\v1;

use App\Http\Middleware\UserApiAuthMiddleware;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Models\ContactImport;

class ProcessContactImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $import;
    protected $includeFirstRow;
    protected $columnMap;
    protected $startRow;

    public function __construct(ContactImport $import, bool $includeFirstRow, array $columnMap, int|null $startRow = 0)
    {
        $this->import           = $import;
        $this->includeFirstRow  = $includeFirstRow;
        $this->columnMap        = $columnMap;
        $this->startRow         = $startRow;
    }

    public int $timeout = 300; 

    /**
     * deleteJob
     *
     * @param int $importId
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


    /**
     * handle
     *
     * @param ContactService $service
     * 
     * @return void
     */
    public function handle(ContactService $service): void
    {
        if ($this->import->is_paused) return;

        $service->processImportChunk(
            import: $this->import, 
            startRow: $this->startRow, 
            includeFirstRow: $this->includeFirstRow, 
            columnMap: $this->columnMap);

        if ($this->import->imported_rows < $this->import->total_rows) {
            self::dispatch($this->import, $this->includeFirstRow, $this->columnMap, $this->import->imported_rows)
                    ->onQueue('imports')
                    ->delay(now()->addSeconds(5));
        } else {
            $service->removeImportFile($this->import);
        }
    }
}