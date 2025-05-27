<?php

namespace Modules\Settings\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NotificationTemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
    return [
            'id'               => $this->id,
            'name'             => $this->name,
            'key'              => $this->key ,
            'subject'          => $this->subject ,
            'mail_body'        => $this->mail_body ,
            'sms_body'         => $this->sms_body ,
            'push_notification_body'        => $this->push_notification_body ,
            'template_key'           => $this->template_key ,
            'type'                   => $this->type ,
            'is_real_time_disable'   => (bool) $this->real_time_disable,
            'is_mail_disable'        => (bool) $this->mail_disable,
            'email_notification'     => $this->email_notification ,
            'push_notification'      => $this->push_notification,
            'site_notificaton'       => $this->site_notificaton,
            'created_at'             => get_date_time($this->created_at),
        ]; 
    }
}
