<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use App\Traits\Common\Fileable;
use App\Enums\Settings\GlobalConfig;
use Modules\User\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    use Fileable;

    protected array $dateFields = ['deleted_at', 'created_at', 'updated_at'];
    protected array $basicFields = ['channel', 'name', 'phone_number', 'email', 'custom_attributes', 'status'];
    protected array $booleanFields = ['is_favorite'];

    /**
     * toArray
     *
     * @param mixed $request
     * 
     * @return array
     */
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

        $data['img_url'] = $this->getimageURL(
                                file: $this->file,
                                location: GlobalConfig::FILE_PATH['contact']['path']);

        // Collecting basic fields
        // ------------------------
        collect($this->basicFields)
            ->each(function ($field) use (&$data) {
                
            if (isset($this->{$field})) $data[$field] = $this->{$field};
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

        // Resources of related models
        // ---------------------------
        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = new UserResource(resource: $this->user);
        }
        
        return $data;
    }
}
