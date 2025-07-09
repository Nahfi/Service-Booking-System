<?php

namespace Modules\SmsMessaging\Http\Requests\Api\v1;

use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;

class SmsProviderRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'          => 'required|string',
            'configuration' => 'nullable|array',
            'configuration.parameters' => [
                'nullable',
                'array',
                Rule::requiredIf(function () {
                    return request()->routeIs("sms-providers.store-api") && !is_null($this->input('configuration'));
                }), 
            ],
            'configuration.permissions.*' => 'string', 
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
