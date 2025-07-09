<?php

namespace Modules\SmsMessaging\Http\Requests\Api\v1;

use App\Http\Requests\BaseRequest;
use Illuminate\Validation\Rule;

class SmsGatewayRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'sms_provider_uid'      => ['nullable', "exists:sms_providers,uid"],
            'identifier'            => 'required|string',
            'identifier_value'      => 'nullable|string',
            'sim_slot'              => 'nullable|numeric|gt:0',
            'credentials'           => 'nullable|array',
            'credentials.*'         => 'nullable|string',
            'configuration'         => 'nullable|array',
            'configuration.*'       => 'nullable|string',
            'rate_limit'            => 'nullable|array',
            'rate_limit.*'          => 'nullable|string',
        ];

        return $rules;
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
