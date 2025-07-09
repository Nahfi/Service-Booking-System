<?php

namespace Modules\Contact\Imports;

use Exception;
use Throwable;
use Illuminate\Support\Arr;
use Modules\Contact\Models\Contact;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Validators\Failure;
use Modules\Contact\Models\ContactImport;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Modules\Contact\Http\Services\ContactService;

class ContactImportHandler implements ToModel, WithChunkReading, SkipsOnError, SkipsOnFailure
{
    private $import;
    private $includeFirstRow;
    private $columnMap;
    private $service;
    private $startRow;
    private $rowCount = 0;

    public function __construct(
        ContactImport $import, 
        bool $includeFirstRow, 
        array $columnMap, 
        ContactService $service, 
        int|null $startRow = 0)
    {
        $this->import           = $import;
        $this->includeFirstRow  = $includeFirstRow;
        $this->columnMap        = $columnMap;
        $this->service          = $service;
        $this->startRow         = $startRow;
    }

    public function model(array $row)
    {
        $this->import->refresh(); 
        if ($this->import->is_paused) return null; 
        
        if(!Arr::has($this->import->meta_data, "header_data")) {

            $headerData = [
                "header_data" => $row
            ];
            $this->import->meta_data = $headerData;
        }
        $this->rowCount++;
        if ($this->startRow > 0 && $this->rowCount <= $this->startRow) return null;
        if (!$this->includeFirstRow && $this->rowCount == 1) return null;
        
        try {

            $contactData    = $this->service->mapImportRow(row: $row, 
                                                columnMap: $this->columnMap, 
                                                includeFirstRow: $this->import->include_first_row, 
                                                headerData: Arr::get($this->import->meta_data, "header_data", []));

            $contact        = Contact::updateOrCreate([
                                    'phone_number'  => Arr::get($contactData, "phone_number", null), 
                                    'user_id'       => $this->import->user_id], 
                                $contactData);

            $this->service->syncContactGroups($contact, $this->import);
            
            $this->import->imported_rows = ($this->import->imported_rows ?? 0) + 1;
            $this->import->save();
        } catch (Exception $e) {

            $this->service->logImportFailure(
                import: $this->import, 
                rowNumber: $this->rowCount + $this->startRow, 
                row: $row, 
                error: $e->getMessage());
            $this->import->increment('failed_rows');
        }

        $this->service->updateImportStatus(
            import: $this->import, 
            totalRows: $this->import->total_rows, 
            importedRows: $this->import->imported_rows, 
            failedRows: $this->import->failed_rows);
    }

    public function chunkSize(): int
    {
        return 1000; //todo: Chunk size affecting thepause functionality
    }

    /**
     * onError
     *
     * @param Throwable $e
     * 
     * @return void
     */
    public function onError(Throwable $e): void
    {
        $this->service->logImportFailure(
            import: $this->import, 
            rowNumber: $this->rowCount + $this->startRow, 
            row: [], 
            error: $e->getMessage());
        $this->import->increment('failed_rows');
        $this->service->updateImportStatus(
            import: $this->import, 
            totalRows: $this->import->total_rows, 
            importedRows: $this->import->imported_rows, 
            failedRows: $this->import->failed_rows);
    }

    /**
     * onFailure
     *
     * @param Failure ...$failures
     * 
     * @return void
     */
    public function onFailure(Failure ...$failures): void
    {
        collect($failures)->each(function ($failure) {

            $this->service->logImportFailure(
                
                import: $this->import,
                rowNumber: $failure->row() + $this->startRow,
                row: $failure->values(),
                error: implode(', ', $failure->errors())
            );
            $this->import->increment('failed_rows');
        });
        $this->service->updateImportStatus(
            import: $this->import,
            totalRows: $this->import->total_rows,
            importedRows: $this->import->imported_rows,
            failedRows: $this->import->failed_rows
        );
    }
}