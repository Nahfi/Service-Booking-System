<?php

namespace Modules\Settings\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Settings\Http\Requests\NotificationTemplateRequest;
use Modules\Settings\Http\Services\NotificationTemplateService;

class NotificationTemplateController extends Controller
{


    public function __construct(protected NotificationTemplateService $notificationTemplateService)
    {
        $this->middleware('user.permission.check:view_setting')->only(['index','show']);
        $this->middleware('user.permission.check:save_setting')->only(['store']);
    }


    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->notificationTemplateService->getTemplates();
    }


    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id): JsonResponse
    {
        return $this->notificationTemplateService->getTemplates($id);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(NotificationTemplateRequest $request, $id): JsonResponse
    {
       return $this->notificationTemplateService->save($request);
    }

    
}
