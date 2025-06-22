<?php

namespace Modules\UserMessaging\Http\Requests;

use App\Enums\Settings\SettingKey;
use App\Http\Requests\BaseRequest;
use App\Rules\FileExtentionCheckRule;
use Illuminate\Foundation\Http\FormRequest;

class UserMessageRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'conversation_id' => 'nullable|exists:user_conversations,id|required_without:receiver_id',
            'receiver_id'     => 'nullable|exists:users,id|required_without:conversation_id',
            'content'         => 'required|string',
            'reply_to_id'     => 'nullable|exists:user_messages,id',
            "files"           => ['nullable','array'],
            "files.*"         => ['nullable','file', new FileExtentionCheckRule(json_decode(site_settings(SettingKey::MIME_TYPES->value),true))]
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
