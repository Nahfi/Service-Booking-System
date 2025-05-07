<?php

namespace App\Notify;

use App\Enums\Common\HttpMethodEnum;
use App\Enums\Settings\NotificationLogStatus;
use App\Http\Services\CurlService;
use App\Models\NotificationLog;

class SendSMS{


	
    /**
     * Summary of send
     * @param \App\Models\NotificationLog $log
     * @param mixed $receiverInstance
     * @return void
     */
	public static function send(NotificationLog $log , mixed $receiverInstance ): void
    {
      

        $status           = true;
        $responseMessage  = translate("SMS Send Successfully");

        try {

               
            $gateway    = json_decode($log->gateway->credential);
			$method     = $gateway->custom_api_method;
			$shortCodes = [
				'{{message}}'=> $log->message,
				'{{number}}' => $receiverInstance->phone,
			];
			$body = (array) $gateway->body;

			foreach ($body as $key => $value) {
				$bodyData = str_replace($value,@$shortCodes[$value] ?? $value ,$value);
				$body[$key] = $bodyData;
			}

			$header = (array)$gateway->headers;
			$url    = $gateway->custom_api_url;


            switch ($method) {
                case HttpMethodEnum::GET->value:
                        $url = $gateway->custom_api_url.'?'.http_build_query($body);
                        CurlService::curlContent($url ,$header);
                    break;
    
                case HttpMethodEnum::POST->value:
                        CurlService::curlPostContent($url,$body,$header);
                    break;
    
            }


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
