<?php

namespace Modules\SmsMessaging\Http\Controllers\Api\v1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Modules\SmsMessaging\Models\SmsProvider;
use Illuminate\Validation\ValidationException;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsGatewayRequest;
use Modules\SmsMessaging\Http\Services\Api\v1\SmsGatewayService;
use Modules\SmsMessaging\Models\SmsGateway;

class SmsGatewayController extends Controller
{
    use ModelAction;

    public function __construct(protected SmsGatewayService $smsGatewayService)
    {
        $this->middleware('user.permission.check:view_sms_gateway')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_sms_gateway')
                ->only(['store', 'update', 'updateStatus', 'bulk']);
        $this->middleware('user.permission.check:destroy_sms_gateway')
                ->only(['destroy', 'restore']);

    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->smsGatewayService->getSmsGateways(parent_user());
    }

    /**
     * store
     *
     * @param SmsGatewayRequest $request
     * 
     * @return JsonResponse
     */
    public function store(SmsGatewayRequest $request): JsonResponse
    {
        return $this->smsGatewayService->saveSmsGateway(parent_user(), $request);
    }

    /**
     * show
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function show(string|null $uid = null): JsonResponse
    {
        return $this->smsGatewayService->getSmsGateways(parent_user(), $uid);
    }

    /**
     * update
     *
     * @param SmsGatewayRequest $request
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function update(SmsGatewayRequest $request, string|null $uid = null): JsonResponse
    {
        return $this->smsGatewayService->saveSmsGateway(parent_user(), $request, $uid);
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
        return $this->smsGatewayService->destroySmsGateway($uid);
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
            'uid'   => 'required|exists:sms_gateways,uid',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,response: ApiResponse::error(
                data: ['errors' => $validator->errors()],
                code: Response::HTTP_BAD_REQUEST
            ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new SmsGateway(),
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

        return $this->smsGatewayService->handleSmsGateway(request: $request);
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
        return $this->smsGatewayService->restoreSmsGateway($uid);
    }
}