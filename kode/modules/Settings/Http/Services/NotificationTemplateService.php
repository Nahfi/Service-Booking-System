<?php

namespace Modules\Settings\Http\Services;

use App\Facades\ApiResponse;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Modules\Settings\Http\Resources\NotificationTemplateResource;
use Modules\Settings\Models\NotificationTemplate;

class NotificationTemplateService 
{


    use Fileable , ModelAction;


   
    /**
     * Summary of getTemplates
     * @param int|string $id
     * @return JsonResponse
     */
    public function getTemplates(int| string | null $id = null): JsonResponse{

        $templates =  NotificationTemplate::when($id,
                            fn(Builder $q):NotificationTemplate | null => $q->where('id',  $id)->firstOrfail(),
                                fn(Builder $q): Collection => $q->get()
                                );

        return ApiResponse::asSuccess( )
                            ->withData(resource: $templates,resourceNamespace: NotificationTemplateResource::class )
                            ->build();
    }


     
    /**
     * Summary of save
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public  function save(Request $request): JsonResponse{

        $template =   NotificationTemplate::where('id',$request->input("id"))
                                                     ->firstOrfail();



        $template->subject = $request->input('subject');


        $template->email_notification = $request->input('email_notification') 
                                               ?? $template->email_notification;
        $template->push_notification  = $request->input('push_notification')
                                               ?? $template->push_notification;
        $template->site_notificaton   = $request->input('site_notificaton')  
                                               ?? $template->site_notificaton;

        $template->push_notification_body = $request->input('push_notification_body') 
                                                ?? $template->push_notification_body;

        if($request->input('mail_body')){

            $mailBody = build_dom_document($request->input('mail_body'));
            $template->mail_body                   = Arr::get($mailBody,'html');
            $this->unlinkEditorFiles($template?->editor_files ?? []);
            $template->editor_files                = Arr::get($mailBody,'files');
        }



       $template->save();

       return ApiResponse::asSuccess()
                  ->withData(resource: $template,resourceNamespace: NotificationTemplateResource::class )
                  ->build();

    }


 
}
