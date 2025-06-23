<?php

namespace Modules\Settings\Http\Requests;

use App\Enums\Common\Status;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class NotificationTemplateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       return  [

            'id'                   => ['required','exists:notification_templates,id'],
            'subject'              => ['nullable','max:150'],
            'email_notification'   => ['nullable' , new Enum(Status::class)],
            'sms_notification'     => ['nullable' , new Enum(Status::class)],
            'push_notification'    => ['nullable' , new Enum(Status::class)],
            'site_notificaton'     => ['nullable' , new Enum(Status::class)]
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
