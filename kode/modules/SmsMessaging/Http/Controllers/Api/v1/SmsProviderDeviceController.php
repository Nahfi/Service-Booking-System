<?php

namespace Modules\SmsMessaging\Http\Controllers\Api\v1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use App\Traits\Common\ModelAction;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\SmsMessaging\Models\SmsProviderDevice;
use Modules\SmsMessaging\Http\Services\Api\v1\SmsProviderService;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderDeviceRequest;

class SmsProviderDeviceController extends Controller
{
    use ModelAction;

    public function __construct(protected SmsProviderService $smsProviderService)
    {
        $this->middleware('user.permission.check:view_sms_provider_devices')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_sms_provider_devices')
                ->only(['updateStatus', 'bulk']);
        $this->middleware('user.permission.check:destroy_sms_provider_devices')
                ->only(['destroy', 'restore']);
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
       
        return $this->smsProviderService->getSmsProviderDevices();
    }

    /**
     * show
     *
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function show(string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->getSmsProviderDevices($uid);
    }
    
    /**
     * updateStatus
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function updateStatus(Request $request): JsonResponse{

        $validator = Validator::make($request->all(), rules: [
            'uid'   => 'required|exists:sms_provider_devices,uid',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator, response: ApiResponse::error(
                data: ['errors' => $validator->errors()],
                code: Response::HTTP_BAD_REQUEST
            ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new SmsProviderDevice(),
            "filterable_attributes" => ['uid' => $request->input(key: 'uid')],
        ]);
    }

    public function bulk(Request $request): JsonResponse{

        return $this->smsProviderService->handleSmsProviderDevice(request: $request);
    }

    /**
     * destroy
     *
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function destroy(string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->destroySmsProviderDevice($uid);
    }

    /**
     * restore
     *
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function restore(string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->restoreSmsProviderDevice($uid);
    }
}
