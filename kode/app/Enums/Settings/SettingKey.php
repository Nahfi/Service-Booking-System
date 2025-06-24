<?php

namespace App\Enums\Settings;

use App\Enums\EnumTrait;

enum SettingKey: string
{
    use EnumTrait;

    #Global

    case SITE_EMAIL                     = "site_email";
    case SITE_NAME                      = "site_name";
    case SITE_PHONE                     = "site_phone";
    case DATE_FORMAT                    = "date_format";
    case TIME_FORMAT                    = "time_format";
    case PAGINATION_NUMBER              = "pagination_number";
    case DEFAULT_SMS_TEMPLATE           = "default_sms_template";
    case DEFAULT_MAIL_TEMPLATE          = "default_mail_template";
    case DEFAULT_PUSH_TEMPLATE          = "default_push_template";


    case LANGUAGES                      = "languages";
    case NOTIFICATION_GATEWAY           = "notification_gateway";

    case MAIL_GATEWAY                   = "mail_gateway";
    case SMS_GATEWAY                    = "sms_gateway";
    case FIREBASE_GATEWAY               = "firebase_gateway";
    case DEFAULT                        = "default";
    case GENERAL                        = "general";
    case SIGN_IN_TITLE                  = "sign_in_title";
    case SIGN_UP_TITLE                  = "sign_up_title";
    case COPY_RIGHT_TEXT                = "copy_right_text";
    case GOOGLE_RECAPTCHA               = "google_recaptcha";
    case STRONG_PASSWORD                = "strong_password";
    case CAPTCHA_WITH_LOGIN             = "captcha_with_login";
    case MAX_FILE_SIZE                  = "max_file_size";
    case MAX_FILE_UPLOAD                = "max_file_upload";
    case DATABASE_NOTIFICATIONS         = "database_notifications";
    case SITE_DESCRIPTION               = "site_description";
    case MIME_TYPES                      = "mime_types";
    case S3_CONFIGURATION                = "s3_configuration";
    case FTP_CONFIGURATION                = "ftp_configuration";
    case STORAGE                        = "storage";
    case TIME_ZONE                      = "time_zone";
    case LOGO                           = "logo";
    case FAVICON                         = "favicon";
    case META_IMAGE                     = "meta_image";
    case SITE_LOGO                      = "site_logo";

    case PLAY_STORE_URL                 = "play_store_url";
    case APP_STORE_URL                  = "app_store_url";



}
