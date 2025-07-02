<?php

namespace Modules\Contact\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\User\Http\Resources\UserResource;

class ContactImportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request): array
    {
        $data = [
            'id'                => $this->id,
            'status'            => $this->status,
            'total_rows'        => $this->total_rows,
            'imported_rows'     => $this->imported_rows,
            'failed_rows'       => $this->failed_rows,
            'include_first_row' => $this->include_first_row ? true : false,
            'is_paused'         => $this->is_paused ? true : false,
            'error_message'     => $this->error_message,

            'raw_deleted_at'    => $this->deleted_at,
            'created_at'        => $this->created_at 
                                    ? get_date_time(date: $this->created_at)
                                    : null,
            'raw_created_at'    => $this->created_at,
            'updated_at'        => $this->updated_at 
                                    ? get_date_time(date: $this->updated_at)
                                    : null,
            'raw_updated_at'    => $this->updated_at,
        ];

        if ($this->relationLoaded('contactGroups') 
            && $this->contactGroups
            && $this->contactGroups->isNotEmpty()) {
            $data['contact_groups'] = new ContactGroupCollection(resource: $this->contactGroups);
        }

        if ($this->relationLoaded('user') 
            && $this->user) {
            $data['user'] = $this->user 
                                ? new UserResource(resource: $this->user)
                                : null;
        }

        if ($this->relationLoaded('failures') 
            && $this->failures
            && $this->failures->isNotEmpty()) {
            $data['failures'] = $this->failures
                                    ? new ContactImportFailureCollection(resource: $this->failures)
                                    : null;
        }
        
        return $data;
    }
}
