<?php

namespace Modules\SmsMessaging\Http\Controllers\Api\v1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Enums\SmsMessage\TypeEnum;
use App\Traits\Common\ModelAction;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Modules\SmsMessaging\Models\SmsProvider;
use Illuminate\Validation\ValidationException;
use Modules\SmsMessaging\Http\Services\Api\v1\SmsProviderService;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsProviderRequest;

class SmsProviderController extends Controller
{
    use ModelAction;

    public function __construct(protected SmsProviderService $smsProviderService)
    {
        $this->middleware('user.permission.check:view_sms_provider')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_sms_provider')
                ->only(['storeApi', 'updateApi', 'storeAndroid', 'updateAndroid', 'updateStatus', 'bulk']);
        $this->middleware('user.permission.check:destroy_sms_provider')
                ->only(['destroy', 'restore']);
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->smsProviderService->getSmsProviders();
    }

    /**
     * storeApi
     *
     * @param SmsProviderRequest $request
     * 
     * @return JsonResponse
     */
    public function storeApi(SmsProviderRequest $request): JsonResponse
    {
        return $this->smsProviderService->saveSmsProvider($request, TypeEnum::API);
    }

    /**
     * updateApi
     *
     * @param SmsProviderRequest $request
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function updateApi(SmsProviderRequest $request, string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->saveSmsProvider($request, TypeEnum::API, $uid);
    }

    /**
     * storeAndroid
     *
     * @param SmsProviderRequest $request
     * 
     * @return JsonResponse
     */
    public function storeAndroid(SmsProviderRequest $request): JsonResponse
    { 
        return $this->smsProviderService->saveSmsProvider($request, TypeEnum::ANDROID);
    }

    /**
     * updateAndroid
     *
     * @param SmsProviderRequest $request
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function updateAndroid(SmsProviderRequest $request, string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->saveSmsProvider($request, TypeEnum::ANDROID, $uid);
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
        return $this->smsProviderService->getSmsProviders($uid);
    }

    

    /**
     * destroy
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function destroy(string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->destroySmsProvider($uid);
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
            'uid'   => 'required|exists:sms_providers,uid',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,response: ApiResponse::error(
                data: ['errors' => $validator->errors()],
                code: Response::HTTP_BAD_REQUEST
            ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new SmsProvider(),
            "filterable_attributes" => ['uid' => $request->input(key: 'uid'), 'user_id' => parent_user()->id],
        ]);
    }

     /**
      * bulk
      *
      * @param Request $request
      * 
      * @return JsonResponse
      */
    public function bulk(Request $request): JsonResponse{

        return $this->smsProviderService->handleSmsProvider(request: $request);
    }

    /**
     * restore
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function restore(string|null $uid = null): JsonResponse
    {
        return $this->smsProviderService->restoreSmsProvider($uid);
    }
}