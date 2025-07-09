<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;
use App\Enums\Contact\ContactChannelEnum;

class ContactGroupRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name'              => 'required|string',
            'channel'           => ['nullable', Rule::in(ContactChannelEnum::toArray())],
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
