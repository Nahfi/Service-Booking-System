<?php

namespace App\Notify;

use App\Enums\Settings\NotificationLogStatus;
use App\Models\NotificationLog;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class SendPushNotification{




    public static function generateOAuthToken($firebaseConfiguration) {
  
        $url = "https://www.googleapis.com/oauth2/v4/token";
    
        $postData = [
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' =>self::generateJWT($firebaseConfiguration)
        ];
    
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,  CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);
    
        $response = curl_exec($ch);
        curl_close($ch);
    
        $data = json_decode($response, true);
        return isset($data['access_token']) ? $data['access_token'] : null;
    }
    
    public static function generateJWT($firebaseConfiguration) {


        $payload = [
            'iss' => $firebaseConfiguration->client_email,
            'scope' => 'https://www.googleapis.com/auth/firebase.messaging',
            'aud' => 'https://www.googleapis.com/oauth2/v4/token',
            'exp' => time() + 3600, 
            'iat' => time() 
        ];
        
        $encodedPayload = base64_encode(json_encode($payload));

        $jwtHeader = [
            'alg' => 'RS256',
            'typ' => 'JWT'
        ];
        $encodedHeader = base64_encode(json_encode($jwtHeader));
        $privateKey = $firebaseConfiguration->private_key;
        openssl_sign("$encodedHeader.$encodedPayload", $signature, $privateKey, OPENSSL_ALGO_SHA256);
        $encodedSignature = base64_encode($signature);
        return "$encodedHeader.$encodedPayload.$encodedSignature";
    }


    /**
     * Summary of send
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     * @return void
     */
	public static function send(NotificationLog $log , mixed $receiverInstance, bool $broadcast, bool $isEmployee): void
    {
        
        $status           = true;
        $responseMessage  = translate("Notification Send Successfully");
        $payload = @$log?->custom_data?->push_notification?->payload;


        $data = [
            "title"            => @$log->custom_data->subject,
            "body"             => @$log->message,
            "image"            => @$payload->image,
            "type"             => (string)@$payload->type,
            "payload_model_id" => (string)@$payload->payload_model_id,
        ];
        if(@$payload->sender_model_id) $data['sender_model_id'] = (string)@$payload->sender_model_id;
        // if(@$payload->shift_status) $data['shift_status'] = (string)@$payload->shift_status;

        if(@$payload?->birthday_user) $data['birthday_user_id'] = (string)$payload->birthday_user->id;
        
        if ($receiverInstance instanceof \App\Models\Admin\Admin) {
            $data['is_admin'] = !$receiverInstance?->is_affiliate_user ? 'yes' : 'no';
        }


      
        try {

            $firebaseConfiguration =  json_decode($log->gateway->value);

            $projectId = @$firebaseConfiguration->project_id; 
            
            $accessToken = self::generateOAuthToken($firebaseConfiguration);
       
            $url = "https://fcm.googleapis.com/v1/projects/{$projectId}/messages:send";


            $header = [
                "Authorization: Bearer " . $accessToken,
                "Content-Type: application/json"
            ];


            $postData = $isEmployee 
                            ? [
                               "message" => [
                                    "data" => $data,
                               ]
                            ] : [
                                "message" => [
                                    "data" => $data,
                                    // "notification" => [
                                    //     "title" => (string)@$log->custom_data->subject,
                                    //     "body"  => (string)@$log->message,
                                    //     "image" => (string)@$payload->image,
                                    // ]
                                ]
                            ];

            if ($broadcast) {
                $postData['message']['topic'] = @$payload->type;
                
            } else {
                $postData['message']['token'] = $receiverInstance->fcm_token;
            }

            

            $postData = json_encode($postData);


            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

            $result = curl_exec($ch);






            curl_close($ch);

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


}
