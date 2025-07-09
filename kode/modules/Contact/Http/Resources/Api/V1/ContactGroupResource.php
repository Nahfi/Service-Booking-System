<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Modules\User\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactGroupResource extends JsonResource
{
    protected array $dateFields = ['deleted_at', 'created_at', 'updated_at'];
    protected array $basicFields = ['name', 'channel', 'status', 'attribute_configurations'];

    public function toArray($request): array
    {
        ## ========== ##
        ## Table Data ##
        ## ========== ##

        // Default Data
        // --------------
        $data = [
            'id'    => $this->id,
            'uid'   => $this->uid,
        ];

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

        // Count of related models
        // ------------------------
        if (isset($this->contacts_count))
            $data['contacts_count'] = $this->contacts_count;
        if (isset($this->contact_imports_count)) 
            $data['contact_imports_count'] = $this->contact_imports_count;

        // Collections of related models
        // -----------------------------
        if ($this->relationLoaded('contacts') 
            && $this->contacts
            && $this->contacts->isNotEmpty()) {
            $data['contacts'] = new ContactCollection(resource: $this->contacts);
        }

        if ($this->relationLoaded('contactImports') 
            && $this->contactImports
            && $this->contactImports->isNotEmpty()) {
            $data['contact_imports'] = new ContactImportCollection(resource: $this->contactImports);
        }

        // Resources of related models
        // ---------------------------
        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = new UserResource(resource: $this->user);
        }
        
        return $data;
    }
}
