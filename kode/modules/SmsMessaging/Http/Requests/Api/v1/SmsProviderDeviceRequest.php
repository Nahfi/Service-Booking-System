<?php

namespace Modules\SmsMessaging\Http\Requests\Api\v1;

use App\Http\Requests\BaseRequest;

class SmsProviderDeviceRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "sms_provider_uid"  => ["required", "exists:sms_providers,uid"],
            "fingerprint"       => ["required", "string"],
            "device_id"         => ["required", "string"],
            "android_version"   => ["required", "string"],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
