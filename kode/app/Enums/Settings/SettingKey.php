<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum SettingKey: string
{
    use EnumTrait;

    #Global 
    case EMAIL                          = "email";
    case SITE_NAME                      = "site_name";
    case SITE_PHONE                     = "site_phone";
    case DATE_FORMAT                    = "date_format";
    case TIME_FORMAT                    = "time_format";
    case PAGINATION_NUMBER              = "pagination_number";

    case DEFAULT_SMS_TEMPLATE           = "default_sms_template";
    case DEFAULT_MAIL_TEMPLATE          = "default_mail_template";
    case DEFAULT_PUSH_TEMPLATE          = "default_push_template";

    #Super Admin / Affiliate
    
    case LANGUAGES                      = "languages";
    case NOTIFICATION_GATEWAY           = "notification_gateway";

    case MAIL_GATEWAY                   = "mail_gateway";
    case FIREBASE_GATEWAY               = "firebase_gateway";
    case DEFAULT                        = "default";
    case SIGN_IN_TITLE                  = "sign_in_title";
    case SIGN_UP_TITLE                  = "sign_up_title";
    case COPY_RIGHT_TEXT                = "copy_right_text";
    case GOOGLE_RECAPTCHA               = "google_recaptcha";
    case STRONG_PASSWORD                = "strong_password";
    case CAPTCHA_WITH_LOGIN             = "captcha_with_login";
    case MAX_FILE_SIZE                  = "max_file_size";
    case MAX_FILE_UPLOAD                = "max_file_upload";
    case DATABASE_NOTIFICATIONS         = "database_notifications";
    case LOGIN_ATTEMPT_VALIDATION       = "login_attempt_validation";
    case MAX_LOGIN_ATTEMPTS             = "max_login_attempts";
    case SITE_DESCRIPTION               = "site_description";
    case MIME_TYPE                      = "mime_type";
    case TIME_ZONE                      = "time_zone";
    case LOGO                           = "logo";
    case SITE_LOGO                      = "site_logo";
    case OTP_EXPIRED_IN                 = "otp_expired_in";
    case EMAIL_VERIFICATION             = "email_verification";

    case INVOICE_PREFIX                 = "invoice_prefix";
    case PLAY_STORE_URL                 = "play_store_url";
    case APP_STORE_URL                  = "app_store_url";






    



    


}
