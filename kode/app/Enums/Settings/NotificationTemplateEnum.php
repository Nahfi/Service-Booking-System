<?php
  
  namespace App\Enums\Settings;

use App\Enums\EnumTrait;
use App\Enums\Settings\NotificationTemplateType;
use Illuminate\Support\Arr;

enum NotificationTemplateEnum :string {

    use EnumTrait;
    
    case TEST_SMS                                   = 'TEST_SMS';
    case TEST_MAIL                                  = 'TEST_MAIL';
    case OTP_VERIFY                                 = 'OTP_VERIFY';
    case NEW_TICKET                                 = 'NEW_TICKET';
    case TICKET_REPLY                               = 'TICKET_REPLY';
    case ASSIGNED_PLAN                              = 'ASSIGNED_PLAN';
    case CONTACT_REPLY                              = 'CONTACT_REPLY';
    case PASSWORD_RESET                             = 'PASSWORD_RESET';
    case INVOICE_GENERATED                          = 'INVOICE_GENERATED';
    case INVOICE_SUBMITTED                          = 'INVOICE_SUBMITTED';
    case USER_REGISTRATION                          = 'USER_REGISTRATION';
    case SUBSCRIPTION_INVOICE                       = 'SUBSCRIPTION_INVOICE';
    case REGISTRATION_VERIFY                        = 'REGISTRATION_VERIFY';
    case SUBSCRIPTION_STATUS                        = 'SUBSCRIPTION_STATUS';
    case SUPPORT_TICKET_REPLY                       = 'SUPPORT_TICKET_REPLY';
    case SUBSCRIPTION_CREATED                       = 'SUBSCRIPTION_CREATED';
    case AFFILIATE_COMMISSION                       = 'AFFILIATE_COMMISSION';
    case SUBSCRIPTION_EXPIRED                       = 'SUBSCRIPTION_EXPIRED';
    case DOCUMENT_FILE_UPLOAD                       = 'DOCUMENT_FILE_UPLOAD';
    case INVOICE_STATUS_CHANGED                     = 'INVOICE_STATUS_CHANGED';
    case PLAN_EXPIRATION_REMINDER                   = 'PLAN_EXPIRATION_REMINDER';
    case BUSINESS_REGISTERED_WITH_AFFILIATE_CODE    = 'BUSINESS_REGISTERED_WITH_AFFILIATE_CODE';
    case BUSINESS_INVITATION                        = 'BUSINESS_INVITATION';

    /**
     * Get Notification Template
     *
     * @return array
     */
    public static function notificationTemplateEnum() : array {

        return [];


    //    return [
    //                    self::PASSWORD_RESET->value => [

    //                             "name"      => key_to_value(self::PASSWORD_RESET->value),
    //                             "subject"   => "Password Reset",
    //                             "body"      => "We have received a request to reset the password for your account on {{otp_code}} and Request time {{time}}",
    //                             "sms_body"  => "We have received a request to reset the password for your account on {{otp_code}} and Request time {{time}}",
    //                             "template_key" => [
    //                                 'otp_code'         => "Password Reset Code",
    //                                 'time'             => "Password Reset Time",
    //                                 'operating_system' => "Operating system",
    //                                 'ip'               => "IP address of the user",
    //                             ],

    //                             'type' => NotificationTemplateType::BOTH,
    //                             'is_real_time_disable' =>  true,
    //                             'is_default' =>  true,

                                
    //                     ],

    //                     self::REGISTRATION_VERIFY->value => [

    //                         "name"      => key_to_value(self::REGISTRATION_VERIFY->value),
    //                         "subject"   => "Registration Verify",
    //                         "body"      => "We have received a request to create an account, you need to verify email first, your verification code is {{otp_code}} and request time {{time}}",
    //                         "sms_body"  => "We have received a request to create an account, you need to verify email first, your verification code is {{otp_code}} and request time {{time}}",
    //                         "template_key" => ([
    //                             'otp_code'  => "Verification Code",
    //                             'time' => "Time",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),

    //                         'type' => NotificationTemplateType::OUTGOING,
                            
    //                         'is_real_time_disable' =>  true,

                            
                            
    //                     ],
                        
    //                     self::SUPPORT_TICKET_REPLY->value => [

    //                         "name"      => key_to_value(self::SUPPORT_TICKET_REPLY->value),
    //                         "subject"   => "Support Ticket",
    //                         "body"      => "Hello Dear ! To get a response to Ticket ID {{ticket_number}}, kindly click the link provided below in order to reply to the ticket. {{link}}",
    //                         "sms_body"  => "Hello Dear ! To get a response to Ticket ID {{ticket_number}}, kindly click the link provided below in order to reply to the ticket. {{link}}",
    //                         "template_key" => ([
    //                             'ticket_number' => "Support Ticket Number",
    //                             'link'          => "Ticket URL For REPLY",
    //                         ]),

    //                         'type' => NotificationTemplateType::OUTGOING,

    //                         'is_real_time_disable' =>  true,
                            
    //                     ],



    //                     self::TEST_MAIL->value => [

    //                         "name"      => key_to_value(self::TEST_MAIL->value),
    //                         "subject"   => "Test Mail",
    //                         "body"      => "This is testing mail for mail configuration Request time<span style=\"background-color: rgb(255, 255, 0);\"> {{time}}</span></h5>",
    //                         "template_key" => ([
    //                             'time' => "Time",
    //                         ]),

    //                         'is_real_time_disable' =>  true,
    //                         'is_sms_disable'       =>  true,
    //                         'is_default' =>  true,
    //                         'type' => NotificationTemplateType::OUTGOING,
                            
    //                     ],


    //                     self::TEST_SMS->value => [

    //                         "name"      => key_to_value(self::TEST_SMS->value),
    //                         "subject"   => "Test sms",
      
    //                         "sms_body"  => "Test sms",
    //                         "template_key" => ([
    //                             'time' => "Time",
    //                         ]),

    //                         'is_real_time_disable' =>  true,
    //                         'is_mail_disable'       =>  true,
    //                         'is_default' =>  true,
    //                         'type' => NotificationTemplateType::OUTGOING,

                            
    //                     ],



    //                     self::TICKET_REPLY->value => [

    //                         "name"      => key_to_value(self::TICKET_REPLY->value),
    //                         "subject"   => "Support Ticket Reply",
    //                         "body"      => "{{name}}!! Just Replied To A Ticket..  To provide a response to Ticket ID {{ticket_number}}, kindly click the link provided below in order to reply to the ticket.  {{link}}",
    //                         "sms_body"  => "{{name}}!! Just Replied To A Ticket..  To provide a response to Ticket ID {{ticket_number}}, kindly click the link provided below in order to reply to the ticket.  {{link}}",
    //                         "push_notification_body"  => "{{name}}!! Just Replied To A Ticket.",

    //                         "template_key" => ([
                                
    //                             'name'          => "User name",
    //                             'ticket_number' => "Support Ticket Number",
    //                             'link'          => "Ticket URL For relpy",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),

    //                         'type' => NotificationTemplateType::INCOMING,
    //                     ],




    //                     self::NEW_TICKET->value => [

    //                         "name"      => key_to_value(self::NEW_TICKET->value),
    //                         "subject"   => "New Ticket",
    //                         "body"      => "A new ticket has been created with the following details: Ticket ID: {{ticket_number}} Created by: {{name}} Date and Time: {{time}}",
    //                         "sms_body"  => "A new ticket has been created with the following details: Ticket ID: {{ticket_number}} Created by: {{name}} Date and Time: {{time}}",

    //                         "push_notification_body"  => "A new ticket has been created",

    //                         "template_key" => ([
    //                             'ticket_number' => "Support Ticket Number",
    //                             'name'          => "User name",
    //                             'time'          => "Created Date and time",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),

                            
    //                         'type' => NotificationTemplateType::INCOMING,
    //                     ],

                   

    //                     self::USER_REGISTRATION->value => [
    //                         "name"      => key_to_value(self::USER_REGISTRATION->value),
    //                         "subject"   => "User registration",
    //                         "body"      => "A new user just registered",

    //                         "sms_body"  => "A new user just registered",

    //                         "push_notification_body"  => "A new ticket has been created",

    //                         "template_key" => ([
    //                             'name'             => "User name",
    //                             'type'             => "User type (Affiliate or Business owner)",
    //                             'time'             => "Time",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),

    //                         'type' => NotificationTemplateType::INCOMING,
                            
    //                     ],


                       

    //                     /** new template */
    //                     self::SUBSCRIPTION_CREATED->value => [
    //                         "name"      => key_to_value(self::SUBSCRIPTION_CREATED->value),
    //                         "subject"   => "New Subscription Created",
    //                         "body"      => "A new subscription has been created.
    //                                           Subscription Details:
    //                                         - User: {{name}}
    //                                         - Subscription Plan: {{package_name}}
    //                                         - Start Date: {{start_date}}
    //                                         - End Date: {{end_date}",
    //                         "sms_body"  => "A new subscription has been created.
    //                                           Subscription Details:
    //                                         - User: {{name}}
    //                                         - Subscription Plan: {{package_name}}
    //                                         - Start Date: {{start_date}}
    //                                         - End Date: {{end_date}}",

    //                         "push_notification_body"  => "A new subscription has been created",

    //                         "template_key" => ([
    //                             'name'           => "User name",
    //                             'start_date'     => "Start Date",
    //                             'end_date'       => "End Date",
    //                             'package_name'   => "Package name",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),

    //                         'type' => NotificationTemplateType::INCOMING,
    //                     ],

    //                     self::SUBSCRIPTION_STATUS->value => [
    //                         "name"      => key_to_value(self::SUBSCRIPTION_STATUS->value),
    //                         "subject"   => "Subscription Status Updated",
    //                         "body"      => "We wanted to inform you that the status of your subscription has been updated.
    //                                             Subscription Details:
    //                                             - Plan: {{plan_name}}
    //                                             - Status: {{status}}
    //                                             - Time :{{time}}",
    //                         "sms_body"  => "We wanted to inform you that the status of your subscription has been updated.
    //                                             Subscription Details:
    //                                             - Plan: {{plan_name}}
    //                                             - Status: {{status}}
    //                                             - Time :{{time}}",
    //                         "push_notification_body"  => "Subscription Status has been updated",
    //                         "template_key" => ([
    //                             'status'         => "Status",
    //                             'time'           => "Time",
    //                             'plan_name'      => "Package name",
    //                         ]) ,

    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],


    //                     self::SUBSCRIPTION_EXPIRED->value => [
    //                         "name"      => key_to_value(self::SUBSCRIPTION_EXPIRED->value),
    //                         "subject"   => "Subscription Expired",
    //                         "body"      => "Your {{name}} Package Subscription Has Been Expired!! at time {{time}}",
    //                         "sms_body"  => "Your {{name}} Package Subscription Has Been Expired!! at time {{time}}",
    //                         "template_key" => ([
    //                             'time'           => "Time",
    //                             'name'           => "Package name"
    //                         ]),
    //                         "push_notification_body"  => "Subscription has been expired",

    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::CONTACT_REPLY->value => [

    //                         "name"      => key_to_value(self::CONTACT_REPLY->value),
    //                         "subject"   => "Contact Message reply",
    //                         "body"      => "Hello Dear! {{email}} {{message}}",
    //                         "sms_body"  => "Hello Dear! {{email}} {{message}}",
    //                         "template_key" => ([
    //                             'email'           => "email",
    //                             'message'           => "message"
    //                         ]),
    //                         'is_real_time_disable'  =>  true,
    //                         'is_sms_disable'       =>  true,
    //                     ],

    //                     self::SUBSCRIPTION_INVOICE->value => [
    //                         "name"      => key_to_value(self::SUBSCRIPTION_INVOICE->value),
    //                         "subject"   => "Successful Payment",
    //                         "body"      => "A subscription payment has been successfully processed.
    //                                        Payment Details:
    //                                      - User: {{name}}
    //                                      - Payment Amount: {{payment_amount}}
    //                                      - Plan: {{package_name}}",

    //                         "sms_body"  => "Payment successful for {{name}}. Amount: {{payment_amount}}, Plan: {{package_name}}",
                        
    //                         "push_notification_body"  => "Payment successful for {{name}}",
                        
    //                         "template_key" => ([
    //                             'name'            => "User name",
    //                             'payment_amount'  => "Payment amount",
    //                             'package_name'    => "Subscription package",
    //                             'created_at'      => "Time",
    //                             'expired_date'    => "Expired date"
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::AFFILIATE_COMMISSION->value => [
    //                         "name"      => key_to_value(self::AFFILIATE_COMMISSION->value),
    //                         "subject"   => "Affiliate Commission Earned",
    //                         "body"      => "An affiliate commission log has been successfully generated.
    //                                        Commission Details:
    //                                      - Affiliate: {{name}}
    //                                      - Commission Amount: {{affiliate_commission}}
    //                                      - For User: {{user_name}}",
    //                         "sms_body"  => "Affiliate commission earned by {{name}}. Commission: {{affiliate_commission}}, User: {{user_name}}",
                        
    //                         "push_notification_body"  => "Affiliate commission earned by {{name}}",
                        
    //                         "template_key" => ([
    //                             'name'               => "Affiliate name",
    //                             'affiliate_commission' => "Affiliate commission",
    //                             'user_name'          => "User name",
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::BUSINESS_REGISTERED_WITH_AFFILIATE_CODE->value => [
    //                         "name"      => key_to_value(self::BUSINESS_REGISTERED_WITH_AFFILIATE_CODE->value),
    //                         "subject"   => "Business Registered with Affiliate Code",
    //                         "body"      => "A new business has registered using your affiliate code.
    //                                        Registration Details:
    //                                      - Business Name: {{business_name}}
    //                                      - Time : {{time}}
    //                                      - Operating System : {{operating_system}}
    //                                      - IP Address : {{ip}}",
    //                         "sms_body"  => "Business registered at {{time}}. Business Name: {{business_name}}. Operating System: {{operating_system}}. IP Address: {{ip}}",
                        
    //                         "push_notification_body"  => "Business registered with your affiliate code",
                        
    //                         "template_key" => ([
    //                             'business_name'   => "Business name",
    //                             'time'             => "Time",
    //                             'operating_system' => "Operating system",
    //                             'ip'               => "IP address",
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::INCOMING,
    //                     ],

    //                     self::INVOICE_GENERATED->value => [
    //                         "name"      => key_to_value(self::INVOICE_GENERATED->value),
    //                         "subject"   => "New Invoice Generated",
    //                         "body"      => "A new invoice has been generated.
    //                                        Invoice Details:
    //                                      - Invoice Number: {{invoice_number}}
    //                                      - Amount: {{currency_symbol}} {{invoice_amount}}
    //                                      - Due Date: {{due_date}}",
    //                         "sms_body"  => "New invoice generated. Invoice #{{invoice_number}}, Amount: {{currency_symbol}} {{invoice_amount}}",
                        
    //                         "push_notification_body"  => "New invoice generated: #{{invoice_number}}",
                        
    //                         "template_key" => ([
    //                             'invoice_number' => "Invoice number",
    //                             'invoice_amount' => "Invoice amount",
    //                             'due_date'       => "Due date",
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::INVOICE_SUBMITTED->value => [
    //                         "name"      => key_to_value(self::INVOICE_SUBMITTED->value),
    //                         "subject"   => "Invoice Submitted by Affiliate User",
    //                         "body"      => "An invoice has been submitted for review by an affiliate user.
    //                                        Invoice Details:
    //                                      - Affiliate User: {{affiliate_name}}
    //                                      - Invoice Number: {{invoice_number}}
    //                                      - Amount: {{currency_symbol}} {{invoice_amount}}",
    //                         "sms_body"  => "Invoice #{{invoice_number}} submitted by affiliate {{affiliate_name}} for review.",
                        
    //                         "push_notification_body"  => "Invoice #{{invoice_number}} submitted for review",
                        
    //                         "template_key" => ([
    //                             'affiliate_name'  => "Affiliate name",
    //                             'invoice_number'  => "Invoice number",
    //                             'currency_symbol' => "Currency Symbol",
    //                             'invoice_amount'  => "Invoice amount",
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::INCOMING,
    //                     ],

    //                     self::INVOICE_STATUS_CHANGED->value => [
    //                         "name"      => key_to_value(self::INVOICE_STATUS_CHANGED->value),
    //                         "subject"   => "Invoice Status Updated",
    //                         "body"      => "The status of your submitted invoice has been updated.
    //                                        Invoice Details:
    //                                      - Invoice Number: {{invoice_number}}
    //                                      - New Status: {{invoice_status}}
    //                                      - Time: {{time}}",
    //                         "sms_body"  => "Invoice #{{invoice_number}} status updated to {{invoice_status}}.",
                        
    //                         "push_notification_body"  => "Invoice #{{invoice_number}} status updated",
                        
    //                         "template_key" => ([
    //                             'invoice_number' => "Invoice number",
    //                             'invoice_status' => "Invoice status",
    //                             'time'           => "Time"
    //                         ]),
                        
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::ASSIGNED_PLAN->value => [
    //                         "name"      => key_to_value(self::ASSIGNED_PLAN->value),
    //                         "subject"   => "New Plan Assigned",
    //                         "body"      => "We are pleased to inform you that a new plan has been assigned to your account.
    //                                         Plan Details:
    //                                         - Plan Name: {{plan_name}}
    //                                         - Start Date: {{start_date}}
    //                                         - Expiration Date: {{end_date}}",
    //                         "sms_body"  => "A new plan has been assigned to you:
    //                                         - Plan Name: {{plan_name}}
    //                                         - Start Date: {{start_date}}
    //                                         - Expiration Date: {{end_date}}",

    //                         "push_notification_body"  => "A new plan has been assigned to the business",

    //                         "template_key" => [
    //                             'plan_name'   => "Plan Name",
    //                             'start_date'  => "Start Date",
    //                             'end_date'    => "Expiration Date",
    //                         ],
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::PLAN_EXPIRATION_REMINDER->value => [
    //                         "name"      => key_to_value(self::PLAN_EXPIRATION_REMINDER->value),
    //                         "subject"   => "Subscription Expiration Reminder",
    //                         "body"      => "Dear Business Owner, your {{name}} Package subscription is set to expire in {{days_left}} day(s) on {{expiration_date}}. Please renew your subscription to continue enjoying uninterrupted services.",
    //                         "sms_body"  => "Reminder: Your {{name}} Package subscription expires in {{days_left}} day(s) on {{expiration_date}}. Renew now!",
    //                         "template_key" => ([
    //                             'name'             => "Package name",
    //                             'days_left'        => "Days left until expiration",
    //                             'expiration_date'  => "Expiration date",
    //                         ]),
    //                         "push_notification_body"  => "Your subscription is expiring soon. Renew now to avoid interruptions!",
                        
    //                         'type' => NotificationTemplateType::OUTGOING,
    //                     ],

    //                     self::DOCUMENT_FILE_UPLOAD->value => [
    //                         "name"      => key_to_value(self::DOCUMENT_FILE_UPLOAD->value),
    //                         "subject"   => "Document File Uploaded",
    //                         "body"      => "\nThe following document has been uploaded by {{name}} for the document: {{document_name}}. \nPlease review the document at your earliest convenience.\n Document uploaded on {{uploaded_time}}.",
    //                         "sms_body"  => "{{name}} has uploaded a document for {{document_name}}. Please review it.",
                        
    //                         "push_notification_body" => "{{name}} has uploaded a document for {{document_name}}.",
                        
    //                         "template_key" => [
    //                             'document_name'     => "Document Name",
    //                             'uploaded_time'     => "Document Uploaded Date and Time",
    //                         ],
                        
    //                         'type' => NotificationTemplateType::BOTH,
    //                     ],

    //                     self::BUSINESS_INVITATION->value => [

    //                         "name"      => key_to_value(self::BUSINESS_INVITATION->value),
    //                         "subject"   => "Welcome to Our Team!",
    //                         "body"      => "Dear {{name}},\n\nCongratulations on joining us! We're thrilled to have you onboard as a part of our team.      Please find the essential information below to get started:\n\n"
    //                                      . "Account Details:\n"
    //                                      . "- Email: {{email_address}}\n"
    //                                      . "- Password: {{password}}\n"
    //                                     ,
                                         
    //                         "sms_body"  => "HELLO DEAR",
                        
    //                         "template_key" => [
    //                             'name'              => "Name",
    //                             'password'          => "Temporary Account Password",
    //                             'email_address'     => "Email Address",
    //                         ],
                        
    //                         'type'                 => NotificationTemplateType::OUTGOING,
    //                         'is_real_time_disable' => true,
    //                         'is_default'           => true,
    //                     ],


                        
    //             ];
    }
}