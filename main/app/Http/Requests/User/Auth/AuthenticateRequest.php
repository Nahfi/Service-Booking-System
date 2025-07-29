<?php

namespace App\Http\Requests\User\Auth;

use App\Http\Requests\BaseRequest;
class AuthenticateRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {

        return [
            'email'         => ['required', 'exists:users,email'],
            'password'      => ['required'],
            'remember_me'   => ['nullable','bool']

        ];

    }



    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
