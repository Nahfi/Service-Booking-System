// Interface for the template_key object
export interface TemplateKey {
    [key: string]: string; 
}

// Interface for each notification template
export interface NotificationTemplate {
    id: number;
    name: string;
    key: string;
    subject: string;
    mail_body: string | null;
    sms_body: string | null;
    push_notification_body: string | null;
    template_key: TemplateKey;
    type: string;
    is_real_time_disable: boolean;
    is_mail_disable: boolean;
    email_notification: string;
    push_notification: string;
    site_notificaton: string; 
    created_at: string;
}

// Interface for the API response
export interface ApiResponse {
    success: boolean;
    code: number;
    message: string;
    data: NotificationTemplate[];
}

export interface SingleTemplateResponse {
    success: boolean;
    code: number;
    message: string;
    data: NotificationTemplate;
}


export interface UpdateTemplateInput {
    id: number;
    name?: string;
    subject?: string;
    sms_body?: string;
    push_notification_body?: string;
    mail_body?: string;
    sms_notification?: string;
    email_notification?: string;
    push_notification?: string;
    site_notificaton?: string;
    [key: string]: any;
}

// Define the response type for the update
export interface UpdateTemplateResponse {
    success: boolean;
    code: number;
    message: string;
    data: NotificationTemplate;
}