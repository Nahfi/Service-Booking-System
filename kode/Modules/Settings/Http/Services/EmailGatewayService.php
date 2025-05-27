<?php

namespace Modules\Settings\Http\Services;

use App\Enums\Settings\GlobalConfig;
use App\Enums\Settings\NotificationLogStatus;
use App\Enums\Settings\NotificationTemplateEnum;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Notify\SendMail;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use App\Traits\Common\Notify;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Settings\Http\Resources\NotificationGatewayResource;
use Modules\Settings\Http\Resources\NotificationLogResource;
use Modules\Settings\Models\NotificationLog;
use Modules\Settings\Models\NotificationTemplate;
use Modules\Settings\Models\Settings;

class EmailGatewayService 
{


    use Fileable , ModelAction , Notify;


    
    /**
     * Summary of getGateways
     * @param int|string|null $id
     * @return JsonResponse
     */
    public function getGateways(int | string | null $id = null): JsonResponse{


        $mailGateways = Settings::mailGateway()
                                ->when($id,fn(Builder $q):Settings | null => $q->where('id',  $id)->firstOrfail(),
                                         fn(Builder $q): Collection => $q->get()
                                );



        return ApiResponse::asSuccess( )
                            ->withData(resource: $mailGateways,resourceNamespace: NotificationGatewayResource::class )
                            ->build();
    }


     
    /**
     * Summary of save
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public  function save(Request $request): JsonResponse{


        $credential = $request->input('credential');

       
        $mailGateway = Settings::mailGateway()
                                    ->where('id',$request->input('id'))
                                    ->firstOrFail();

        $mailGateway->value = json_encode(value: $credential);
        $mailGateway->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $mailGateway,resourceNamespace: NotificationGatewayResource::class )
                                ->build();

    
    }


    /**
     * Summary of setDefaultGateway
     * @param int|string $id
     * @return JsonResponse
     */
    public function setDefaultGateway(int | string $id): JsonResponse{


        $mailGateway = Settings::mailGateway()
                                ->where('id',$id)
                                ->firstOrFail();

        $mailGateway->is_default = true;
        $mailGateway->save();
        
        Settings::mailGateway()
                    ->where( 'id','!=',$mailGateway->id)
                    ->update(['is_default' => false]);

        return ApiResponse::asSuccess()
                                ->build();     

    }


    /**
     * Summary of test
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function test(Request $request): JsonResponse{


        $user = parent_user();
        
        $mailGateway = Settings::mailGateway()
                                ->where('id',$request->input('id'))
                                ->firstOrfail();


        $template = NotificationTemplate::where('key', NotificationTemplateEnum::TEST_MAIL->value)
                                           ->firstOrfail();

                    
        
        $siteLogo = Settings::with(['file'])
                                ->where('key',SettingKey::SITE_LOGO->value)
                                ->where('group', SettingKey::LOGO->value)
                                ->first();

    

        $email = $request->input('email');


        $messageData = [
            'tmpCodes' => ['time' => Carbon::now()],
            'userinfo' => (object)['email' =>  $email , 'username' =>  $email],
            'logo'     => $this->getimageURL(
                                    file    : $siteLogo?->file , 
                                    location: GlobalConfig::FILE_PATH[SettingKey::SITE_LOGO->value]['user']['path']),
        ];

        $message =  $this->replacePlaceholders($template->mail_body ,SettingKey::DEFAULT_MAIL_TEMPLATE->value,... $messageData);


        $notificationLog = new NotificationLog();
        $notificationLog->gateway_id        = $mailGateway->id;
        $notificationLog->sender_model      = get_class($user);
        $notificationLog->sender_id         = $user->id;
        $notificationLog->message           = $message;
        $notificationLog->custom_data       = ['subject' => $template->subject];
        $notificationLog->status            = NotificationLogStatus::PENDING;
        $notificationLog->save();

        $notificationLog->load(['gateway']);

        SendMail::send(log: $notificationLog,
                        receiverInstance: (object)['email' => $email ,'username' =>$email]);



        return ApiResponse::asSuccess()
                             ->withData(resource: $notificationLog , resourceNamespace: NotificationLogResource::class)
                             ->build();


    }

 
}
