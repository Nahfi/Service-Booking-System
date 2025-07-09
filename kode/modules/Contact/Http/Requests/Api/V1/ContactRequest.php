<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use App\Enums\Settings\SettingKey;
use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;
use App\Rules\FileExtentionCheckRule;
use App\Enums\Contact\ContactChannelEnum;

class ContactRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'contact_group_ids'     => ['nullable', 'array'],
            'contact_group_ids.*'   => 'nullable|string|exists:contact_groups,id',
            'channel'               => ['nullable', Rule::in(ContactChannelEnum::toArray())],
            'name'                  => 'required|string',
            'phone_number'          => 'nullable|string',
            'email'                 => 'nullable|email',
            'is_favorite'           => 'nullable|boolean',
            "image"              => ['nullable','image', new FileExtentionCheckRule(json_decode(site_settings(SettingKey::MIME_TYPES->value),true))]
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
