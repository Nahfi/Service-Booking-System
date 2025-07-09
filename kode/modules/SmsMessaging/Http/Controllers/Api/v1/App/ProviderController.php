<?php

namespace Modules\SmsMessaging\Http\Controllers\Api\v1\App;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Modules\SmsMessaging\Http\Services\Api\v1\Device\ProviderService;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderDeviceRequest;

class ProviderController extends Controller
{
    /**
     * connect
     *
     * @return JsonResponse
     */
    public function connect(SmsProviderDeviceRequest $request): JsonResponse 
    {
        $providerService = new ProviderService();
        return $providerService->connectWithProvider($request);
    }

    /**
     * checkConnection
     *
     * @return JsonResponse
     */
    public function checkConnection(): JsonResponse 
    {
        return ApiResponse::asSuccess()
                                ->withMessage(translate("Device successfully connected"))
                                ->build();
    }
}
