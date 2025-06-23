<?php

namespace Modules\Settings\Http\Controllers\Api\V1;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Settings\Http\Requests\EmailgatewayRequest;
use Modules\Settings\Http\Services\EmailGatewayService;
class EmailGatewayController extends Controller
{


    public function __construct(protected EmailGatewayService $emailGatewayService){

        $this->middleware('user.permission.check:view_gateway')->only(['index','show','testGateway']);
        $this->middleware('user.permission.check:save_gateway')->only(['store','update','updateStatus','makeDefault']);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->emailGatewayService->getGateways();  
    }

   
    
    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(EmailgatewayRequest $request, $id): JsonResponse
    {
        return $this->emailGatewayService->save($request);  
    }


    
    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
        return $this->emailGatewayService->getGateways($id);  
    }



    /**
     * Summary of testGateway
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return JsonResponse
     */
    public function testGateway(Request $request): JsonResponse{


        $validator = Validator::make($request->all() ,rules: [
            'id'    => 'required|exists:settings,id',
            'email' => 'required|email',
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data : ['errors' => $validator->errors()],
                    code : Response::HTTP_BAD_REQUEST
                ));


        return $this->emailGatewayService->test($request);  

    }


    /**
     * Summary of makeDefault
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
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

        return  $this->emailGatewayService->setDefaultGateway($request->input('id'));
                                 
    }

    
}
