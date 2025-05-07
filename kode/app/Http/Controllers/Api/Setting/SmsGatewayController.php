<?php

namespace App\Http\Controllers\Api\Business\Setting;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\Business\Setting\SmsGatewayRequest;
use App\Http\Services\Business\Settings\NotificationGatewayService;

class SmsGatewayController extends Controller implements HasMiddleware
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
            new Middleware(middleware: 'business.permissions:view_gateway', only: [ 'index']),
            new Middleware(middleware: 'business.permissions:save_gateway', only: [
                'store',
                'update',
                'makeDefault'
            ]),
            new Middleware(middleware: 'business.permissions:delete_sms_gateway', only: ['destroy']),
        ];
    }
    
    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return NotificationGatewayService::getSmsgateways(getBusiness($this->user));  
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
        return NotificationGatewayService::saveSmsGateway((object)$request->except('_token'), getBusiness($this->user));  
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * update
     *
     * @param SmsGatewayRequest $request
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function update(SmsGatewayRequest $request, string $id): JsonResponse
    {
        return NotificationGatewayService::saveSmsGateway((object)$request->except('_token'), getBusiness($this->user));  
    }

    /**
     * destroy
     *
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        return NotificationGatewayService::destroySmsGateway(id: $id, user: getBusiness($this->user));
    }

    /**
     * makeDefault
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function makeDefault(Request $request): JsonResponse{

        $validator = Validator::make($request->all() ,rules: [
            'id' => 'required|exists:settings,id',
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data : ['errors' => $validator->errors()],
                    code : Response::HTTP_BAD_REQUEST
                ));

                
        $smsGateway = Setting::where('bo_id', getBusiness($this->user)->id)
                                ->smsGateway()
                                ->where('id',$request->input('id'))
                                ->firstOrFail();

        $smsGateway->is_default = true;
        $smsGateway->save();
        
        Setting::where('bo_id', getBusiness($this->user)->id)
                    ->smsGateway()
                    ->where( 'id','!=',$request->input(key: 'id'))
                    ->update(['is_default' => false]);


        return ApiResponse::asSuccess()
                                ->build();

                                                        
    }
}
