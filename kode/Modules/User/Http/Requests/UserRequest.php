<?php

namespace Modules\User\Http\Requests;

use App\Enums\Settings\SettingKey;
use App\Http\Requests\BaseRequest;
use App\Rules\FileExtentionCheckRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
class UserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $password =     request()->isMethod('patch') 
                                ? 'nullable' 
                                : "required";
                            
        $rules = [
            'name'               => ["required","max:191",'string'],
            'role_id'            => ["required","exists:roles,id"],
            'phone'              => ['nullable','unique:users,phone,'.request()->input('id') , 'max:191'],
            'email'              => ['required','email:rfc,dns','unique:users,email,'.request()->input('id') , 'max:191'],
            'password'           => [$password ,Password::min(6),"confirmed"],
            'meta_data'          => ['nullable','array'],
            'address'            => ['nullable','array'],
            "image"              => ['nullable','image', new FileExtentionCheckRule(json_decode(site_settings(SettingKey::MIME_TYPES->value),true))]
        ];

       if(request()->isMethod('patch')) $rules ['id'] = "required|exists:users,id";

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
