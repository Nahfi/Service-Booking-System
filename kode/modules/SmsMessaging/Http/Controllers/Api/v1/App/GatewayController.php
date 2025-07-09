<?php

namespace Modules\SmsMessaging\Http\Controllers\Api\v1\App;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;
use Modules\SmsMessaging\Http\Requests\Api\v1\SmsGatewayRequest;
use Modules\SmsMessaging\Http\Services\Api\v1\Device\ProviderService;
use Modules\SmsMessaging\Http\Services\Api\v1\SmsGatewayService;
use Modules\SmsMessaging\Http\Services\Api\v1\SmsProviderService;
use Modules\SmsMessaging\Models\SmsGateway;

class GatewayController extends Controller
{
    use ModelAction;

    private $smsProvider = null;

    public function __construct(protected SmsGatewayService $smsGatewayService)
    {
        $smsProviderService = new ProviderService();
        $this->smsProvider = $smsProviderService->getSmsProviderViaToken();
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->smsGatewayService->getSmsGateways($this->smsProvider);
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
        return $this->smsGatewayService->saveSmsGateway($this->smsProvider, $request);
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
        return $this->smsGatewayService->getSmsGateways($this->smsProvider, $uid);
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
        return $this->smsGatewayService->saveSmsGateway($this->smsProvider, $request, $uid);
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
            "filterable_attributes" => [
                'uid'               => $request->input(key: 'uid'), 
                'sms_provider_id'   => $this->smsProvider->id,
                'user_id'           => $this->smsProvider->user_id
            ],
        ]);
    }
}
