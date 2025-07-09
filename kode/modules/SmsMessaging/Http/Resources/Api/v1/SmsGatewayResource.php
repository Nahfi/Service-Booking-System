<?php

namespace Modules\SmsMessaging\Http\Resources\Api\v1;

use App\Traits\Common\Fileable;
use Illuminate\Http\Resources\Json\JsonResource;

class SmsGatewayResource extends JsonResource
{
    use Fileable;

    protected array $dateFields = ['deleted_at', 'created_at', 'updated_at'];
    protected array $basicFields = ['identifier', 'identifier_value', 'sim_slot', 'credentials', 'configuration', 'rate_limit', 'status'];

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
        
        // Collections of related models
        // -----------------------------
        if ($this->relationLoaded('smsProvider') 
            && $this->smsProvider) {
            $data['sms_provider'] = new SmsProviderResource(resource: $this->smsProvider);
        }
        
        if ($this->relationLoaded('smsProviderDevice') 
            && $this->smsProviderDevice) {
            $data['sms_provider_device'] = new SmsProviderDeviceResource(resource: $this->smsProviderDevice);
        }
        
        return $data;
    }
}
