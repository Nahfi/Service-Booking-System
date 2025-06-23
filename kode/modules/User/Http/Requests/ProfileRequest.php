<?php

namespace Modules\User\Http\Requests;

use App\Enums\Settings\SettingKey;
use App\Http\Requests\BaseRequest;
use App\Rules\FileExtentionCheckRule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user= request()->user();

        $rules = [
            'name'               => ["required","max:191",'string'],
            'phone'              => ['nullable','unique:users,phone,'.$user->id , 'max:191'],
            'email'              => ['required','email:rfc,dns','unique:users,email,'.$user->id , 'max:191'],
            'meta_data'          => ['nullable','array'],
            'address'            => ['nullable','array'],
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
