<?php

namespace Modules\SmsMessaging\Http\Resources\Api\v1;

use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;

class SmsProviderResource extends JsonResource
{
    use Fileable;

    protected array $dateFields = ['last_active_time', 'deleted_at', 'created_at', 'updated_at'];
    protected array $basicFields = ['type', 'name', 'configuration', 'status'];

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

        // Collecting basic fields
        // ------------------------
        collect($this->basicFields)
            ->each(function ($field) use (&$data) {
                
            if (isset($this->{$field})) $data[$field] = $this->{$field};
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
        if (isset($this->devices_count)) $data['devices_count'] = $this->devices_count;
        if (isset($this->sms_gateways_count)) $data['sms_gateways_count'] = $this->sms_gateways_count;
        
        // Collections of related models
        // -----------------------------
        if ($this->relationLoaded('smsGateways') 
            && $this->smsGateways
            && $this->smsGateways->isNotEmpty()) {
            $data['sms_gateways'] = new SmsGatewayCollection(resource: $this->smsGateways);
        }
        
        return $data;
    }
}
