<?php

namespace Modules\Settings\Http\Requests;

use App\Enums\Settings\GlobalConfig;
use App\Http\Requests\BaseRequest;

class LanguageRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $langCodes = collect(GlobalConfig::LANG_CODES)->pluck('lang_code')->toArray();
        return [
            'id'            => 'nullable|exists:settings,id',
            'name'          => 'required|max:100',
            'lang_code'     => 'required|max:100|in:' . implode(',', $langCodes),
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
