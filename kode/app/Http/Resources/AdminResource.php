<?php

namespace App\Http\Resources;

use App\Enums\Settings\GlobalConfig;
use App\Http\Resources\Admin\Affiliation\AffiliateCommissionCollection;
use App\Http\Resources\Admin\Affiliation\AffiliateCommissionResource;
use App\Http\Resources\Admin\RoleResource;
use App\Traits\Common\Fileable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    use Fileable;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'uid' => $this->uid,
            'fcm_token' => $this->fcm_token,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'is_super_admin' => $this->is_super_admin ? true : false,
            'is_admin_model' => true,
            'kyc_verified' => $this->kyc_verified ? true : false,
            'phone' => $this->phone,
            'status' => $this->status,
            'affiliate_configuration' => $this->affiliate_configuration,
            'affiliate_registraton_status' => $this->affiliate_registraton_status,
            'address' => $this->address,
            'is_email_verified' => $this->email_verified_at ? true : false,
            'email_verified_at' => $this->email_verified_at ? get_date_time($this->email_verified_at) : null,
            'created_at' => get_date_time($this->created_at),
            'img_url' => $this->getimageURL(
                $this->file,
                $this->is_affiliate_user ? GlobalConfig::FILE_PATH['profile']['affiliate_user']['path'] : GlobalConfig::FILE_PATH['profile']['admin']['path']
            ),
        ];

        if ($this->relationLoaded('affiliateCommissionLogs') && $this->affiliateCommissionLogs) {
            $data['affiliate_commission_logs'] = new AffiliateCommissionCollection(resource: $this->affiliateCommissionLogs);
        }


        
        if ($this->relationLoaded('role') && $this->role) {
            $data['role'] = new RoleResource(resource: $this->role);
        }

        if($this->is_affiliate_user && $this->counters){
            $data['counters'] = $this->counters;
        }

        return $data;
    }
}
