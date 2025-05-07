<?php

namespace App\Http\Controllers\Api\Business\Setting;

use App\Models\User;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\NotificationTemplate;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Resources\NotificationTemplateResource;
use App\Http\Services\Business\Settings\TemplateService;
use App\Enums\Settings\Business\NotificationTemplateEnum;
use Database\Seeders\Business\NotificationTemplateSeeder;
use App\Http\Requests\Business\Setting\NotificationTemplateRequest;

class NotificationTemplateController extends Controller implements HasMiddleware
{
    protected ?User $user;

    public function __construct()
    {
       
        $this->user = getAuthUser('user:api', ['business']);
        
    }

    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'business.permissions:view_notification_templates', only: ['index']),
            new Middleware(middleware: 'business.permissions:save_notification_templates', only: ['update', 'importNotificationTemplate'])
        ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse | string{
    
        $business   = getBusiness($this->user);


        $templates  = NotificationTemplate::where("bo_id", $business->id)
                                                ->latest()
                                                ->get();


        return ApiResponse::asSuccess()
                                ->setBusiness($business)
                                ->withData(resource: $templates, resourceNamespace: NotificationTemplateResource::class )
                                ->build();
    }

    /**
     * update
     *
     * @param NotificationTemplateRequest $request
     * 
     * @return JsonResponse
     */
    public function update(NotificationTemplateRequest $request): JsonResponse{

        
        return TemplateService::updateTemplate($request, getBusiness($this->user));
    }

    /**
     * importNotificationTemplate
     *
     * @return JsonResponse
     */
    public function importNotificationTemplate(): JsonResponse{

        $existing_template_slugs = NotificationTemplate::where('bo_id', getBusiness($this->user)->id)
                                                        ->pluck('slug')
                                                        ->toArray();

        $templates = NotificationTemplateEnum::notificationTemplateEnum();

        $new_templates = array_filter(array_keys($templates), function ($slug) use ($existing_template_slugs) {
            return !in_array($slug, $existing_template_slugs);
        });

        if (!empty($new_templates)) {
            (new NotificationTemplateSeeder())->run(getBusiness($this->user));
                return ApiResponse::asSuccess()
                                        ->build();             
        } 

        return ApiResponse::asError()
                                ->withMessage(translate(value: 'Notification gateways already exist for this Business.'))
                                ->withHttpCode(Response::HTTP_CONFLICT)
                                ->build();
    }
}
