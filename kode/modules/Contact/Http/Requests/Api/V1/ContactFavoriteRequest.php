<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use App\Http\Requests\BaseRequest;

class ContactFavoriteRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bulk_ids'    => ['required' ,'array'],
            'bulk_ids.*'  => ["required",'exists:contacts,id'],
            'value'       => ['required', 'boolean'],
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
