<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use App\Http\Requests\BaseRequest;

class ContactGroupAttachmentRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'contact_ids'           => ['required' ,'array'],
            'contact_ids.*'         => ["required",'exists:contacts,id'],
            'contact_group_ids'     => ['required' ,'array'],
            'contact_group_ids.*'   => ["required",'exists:contact_groups,id'],
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
