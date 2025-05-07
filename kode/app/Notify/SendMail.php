<?php
namespace App\Notify;

use App\Enums\Settings\NotificationLogStatus;
use App\Enums\Settings\SettingKey;

use App\Models\NotificationLog;

use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
class SendMail
{





    /**
     * Summary of send
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     */
    public static function send(NotificationLog $log , mixed $receiverInstance) :void
    {
 
        $gatewayCode = [
            "104PHP"        => "sendPhpMail",
            "101SMTP"       => "sendSMTPMail",
            "102SENDGRID"   => "sendGrid",
        ];


        self::{$gatewayCode[$log->gateway->key]}($log ,  $receiverInstance );


    }

    

    /**
     * Summary of sendPhpMail
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     * @return void
     */
    public static function sendPhpMail(NotificationLog $log , mixed $receiverInstance) :void
    {
       
        $emailFrom  = site_settings(SettingKey::EMAIL->value);   
        $sitename   = site_settings(SettingKey::SITE_NAME->value);


        if($log?->sender_model && $log?->sender_id){

             $user = @(new $log->sender_model)->find($log?->sender_id);

             if($user){

                $emailFrom  = business_site_settings($user , SettingKey::EMAIL->value);   
                $sitename   = business_site_settings($user , SettingKey::SITE_NAME->value);
             }

        }

         
        $status = true;
        $responseMessage = translate("Email Send Successfully");
        $headers = "From: $sitename <$emailFrom> \r\n";
        $headers .= "Reply-To: $sitename <$emailFrom> \r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
      
        try {
            @mail($receiverInstance->email, $log->custom_data->subject, $log->message, $headers); 

            $log->status = NotificationLogStatus::SUCCESS;
    
        } catch (\Exception $e) {

            $log->status     = NotificationLogStatus::FAILED;
            $status          = false;
            $responseMessage = $e->getMessage();
        }

        $log->gateway_response = [
            "status"  => $status,
            "message" => $responseMessage
        ];

        $log->save();

   
    }

    
  
    /**
     * Summary of sendSMTPMail
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     * @return void
     */
    public static function sendSMTPMail(NotificationLog $log , mixed $receiverInstance) :void
    {

        $status          = true;
        $responseMessage = translate("Email Send Successfully");


        try {

            $gateway    = json_decode($log->gateway->value);
            $username   = $gateway->username;
            $password   = $gateway->password;
            $host       = $gateway->host;
            $port       = $gateway->port;
            $encryption = $gateway->encryption;
            $pattern    = '/[\?#\[\]@!$&\'()\*\+,;=]/';
    
            $encodedUsername = preg_match($pattern, $username) ? urlencode($username) : $username;
            $encodedPassword = preg_match($pattern, $password) ? urlencode($password) : $password;
    
            $dsn = sprintf(
                'smtp://%s:%s@%s:%d?encryption=%s',
                $encodedUsername,
                $encodedPassword,
                $host,
                $port,
                $encryption
            );
    
            $transport = Transport::fromDsn($dsn);
            $mailer    = new Mailer($transport);


            $email = (new Email())
                        ->from(new Address($gateway->from->address, $gateway->from->name))
                        ->to($receiverInstance->email)
                        ->replyTo($gateway->from->address )
                        ->subject($log->custom_data->subject)
                        ->html($log->message);

            $mailer->send($email);
            $log->status = NotificationLogStatus::SUCCESS;

        } catch (\Exception $exception) {
            $log->status     = NotificationLogStatus::FAILED;
            $status          = false;
            $responseMessage = $exception->getMessage();
        }


        $log->gateway_response = [
            "status"  => $status,
            "message" => $responseMessage
        ];

        $log->save();

     
    }


   
    /**
     * Summary of sendGrid
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     * @return void
     */
    public static function sendGrid(NotificationLog $log , mixed $receiverInstance) :void
    { 

        $status           = true;
        $responseMessage  = translate("Email Send Successfully");

        $gateway    = json_decode($log->gateway->value);
        try{
            $email = new \SendGrid\Mail\Mail();
            $email->setFrom($gateway->from->address, $gateway->from->name);
            $email->setSubject($log->custom_data->subject);
            $email->addTo($receiverInstance->email);
            $email->addContent("text/html", $log->message);
            $sendgrid = new \SendGrid(@$gateway->app_key);
            $response = $sendgrid->send($email);


            $log->status = NotificationLogStatus::SUCCESS;
    
            if (!in_array($response->statusCode(), ['201','200','202'])){
                $log->status     = NotificationLogStatus::FAILED;
                $status            = false;
                $responseMessage   = translate("Faild To Send Email!! Configuration Error");
            }
            
        }catch(\Exception $e){
            $log->status     = NotificationLogStatus::FAILED;
            $status          = false;
            $responseMessage = $e->getMessage();

        }

        $log->gateway_response = [
            "status"  => $status,
            "message" => $responseMessage
        ];

        $log->save();

    }
}