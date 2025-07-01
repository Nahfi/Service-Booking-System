<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;
use modules\Contact\Enums\ChannelEnum;

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
            'contact_group_uid' => 'nullable|integer|exists:contact_groups,uid',
            'channel'           => ['nullable', Rule::in(ChannelEnum::toArray())],
            'name'              => 'required|string',
            'phone_number'      => 'nullable|string',
            'email'             => 'nullable|email',
            'is_favorite'       => 'nullable|boolean',
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
