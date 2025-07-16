<?php

namespace Modules\Settings\Http\Controllers\Api\V1;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Settings\Http\Requests\FirebaseGatewayRequest;
use Modules\Settings\Http\Services\FirebaseGatewayService;

class FirebaseGatewayController extends Controller
{


    public function __construct(protected FirebaseGatewayService $firebaseGatewayService){

        $this->middleware('user.permission.check:view_gateway')->only(['index','show','testGateway']);
        $this->middleware('user.permission.check:save_gateway')->only(['store','update','updateStatus','makeDefault']);

        $this->middleware('user.permission.check:destroy_gateway')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->firebaseGatewayService->getGateways();
    }



    /**
     * Store a newly created resource in storage.
     * @param FirebaseGatewayRequest $request
     * @return Response
     */
    public function store(FirebaseGatewayRequest $request): JsonResponse
    {
      return  $this->firebaseGatewayService->save($request);
    }


    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(FirebaseGatewayRequest $request, $id): JsonResponse
    {
        return $this->firebaseGatewayService->save($request);
    }



    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
        return $this->firebaseGatewayService->getGateways($id);
    }



     /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy(int | string $id): JsonResponse
    {
        return  $this->firebaseGatewayService->destroy(id: $id);
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

        return  $this->firebaseGatewayService->setDefaultGateway($request->input('id'));

    }


}
