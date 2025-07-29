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
    case LANGUAGES                      = "languages";
    case DEFAULT                        = "default";
    case GENERAL                        = "general";
    case MAX_FILE_SIZE                  = "max_file_size";
    case MAX_FILE_UPLOAD                = "max_file_upload";
    case SITE_DESCRIPTION               = "site_description";
    case MIME_TYPES                     = "mime_types";
    case S3_CONFIGURATION               = "s3_configuration";
    case FTP_CONFIGURATION              = "ftp_configuration";
    case STORAGE                        = "storage";
    case TIME_ZONE                      = "time_zone";
    case LOGO                           = "logo";
    case FAVICON                        = "favicon";
    case META_IMAGE                     = "meta_image";
    case SITE_LOGO                      = "site_logo";
    case DEFAULT_MAIL_TEMPLATE          = "default_mail_template";
    case MAIL_GATEWAY                   = "mail_gateway";
    case NOTIFICATION_GATEWAY           = "notification_gateway";





}
