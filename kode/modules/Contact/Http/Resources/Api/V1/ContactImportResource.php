<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Modules\User\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactImportResource extends JsonResource
{
    protected array $dateFields = ['created_at', 'updated_at'];
    protected array $basicFields = ['total_rows', 'imported_rows', 'failed_rows', 'status', 'error_message'];
    protected array $booleanFields = ['include_first_row', 'is_paused'];

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

        // Collecting boolean fields
        // --------------------------
        collect($this->booleanFields)
            ->each(function ($booleanfield) use (&$data) {

            if (isset($this->{$booleanfield})) $data[$booleanfield] = $this->{$booleanfield} ? true : false;
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

        // Count of related models
        // ------------------------
        if (isset($this->contact_groups_count)) $data['contact_groups_count'] = $this->contact_groups_count;

        // Collections of related models
        // -----------------------------
        if ($this->relationLoaded('contactGroups') 
            && $this->contactGroups
            && $this->contactGroups->isNotEmpty()) {
            $data['contact_groups'] = new ContactGroupCollection(resource: $this->contactGroups);
        }

        if ($this->relationLoaded('failures') 
            && $this->failures
            && $this->failures->isNotEmpty()) {
            $data['failures'] = $this->failures
                                    ? new ContactImportFailureCollection(resource: $this->failures)
                                    : null;
        }

        // Resources of related models
        // ---------------------------
        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = $this->user 
                                ? new UserResource(resource: $this->user)
                                : null;
        }

        return $data;
    }
}
