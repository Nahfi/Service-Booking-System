<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Modules\User\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactImportFailureResource extends JsonResource
{
    protected array $dateFields = ['created_at', 'updated_at'];
    protected array $basicFields = ['row_number', 'row_data', 'error'];

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request): array
    {
        ## ========== ##
        ## Table Data ##
        ## ========== ##

        // Default Data
        // --------------
        $data = ['id' => $this->id];

        // Collecting basic fields
        // ------------------------
        collect($this->basicFields)
            ->each(function ($field) use (&$data) {
            if (isset($this->{$field})) {
                $data[$field] = $this->{$field};
            }
        });

        // Collecting date fields
        // -----------------------
        collect($this->dateFields)->each(function ($dateField) use (&$data) {
            if (isset($this->{$dateField})) {
                $data[$dateField] = get_date_time(date: $this->{$dateField});
                $data['raw_' . $dateField] = $this->{$dateField};
            }
        });

        ## =============== ##
        ## Relational Data ##  
        ## =============== ##

        // Resources of related models
        // ---------------------------
        if ($this->relationLoaded('contactImport') 
            && $this->contactImport) {
            $data['contact_import'] = $this->contactImport 
                                        ? new ContactImportResource(resource: $this->contactImport)
                                        : null;
        }

        return $data;
    }
}
