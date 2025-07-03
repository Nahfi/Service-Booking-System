<?php

namespace Modules\Contact\Http\Requests\Api\V1;

use Illuminate\Validation\Rule;
use App\Http\Requests\BaseRequest;
use App\Rules\FileExtentionCheckRule;
use App\Enums\Contact\ContactChannelEnum;

class ContactImportRequest extends BaseRequest
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
            'contact_group_ids.*'   => ['nullable', 'string', 'exists:contact_groups,id'],
            'channel'               => ['nullable', Rule::in(ContactChannelEnum::toArray())],
            "file"                  => ['required', new FileExtentionCheckRule([
                'csv', 'xslx', 'xsl'
            ])],
            'column_map'            => ['nullable', 'array'],
            'column_map.*'          => ['required', 'string'],
            'immediate_import'      => ['nullable', 'boolean'],
            'include_first_row'     => ['nullable', 'boolean'],
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
