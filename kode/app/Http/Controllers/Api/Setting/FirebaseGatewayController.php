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
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\Business\Setting\FirebaseGatewayRequest;
use App\Http\Services\Business\Settings\NotificationGatewayService;


class FirebaseGatewayController extends Controller implements HasMiddleware
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
            new Middleware(middleware: 'business.permissions:view_gateway', only: ['index']),
            new Middleware(middleware: 'business.permissions:save_gateway', only: [
                'store',
                'update',
                'makeDefault'
            ]),
            new Middleware(middleware: 'business.permissions:delete_firebase_gateway', only: ['destroy']),
        ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index():JsonResponse
    {
        return NotificationGatewayService::getFirebasegateways(getBusiness($this->user));  
    }

    /**
     * store
     *
     * @param FirebaseGatewayRequest $request
     * 
     * @return JsonResponse
     */
    public function store(FirebaseGatewayRequest $request): JsonResponse
    {
        return NotificationGatewayService::saveFireBaseGateway((object)$request->except('_token'), getBusiness($this->user));  
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
     * @param FirebaseGatewayRequest $request
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function update(FirebaseGatewayRequest $request, string $id): JsonResponse
    {
        return NotificationGatewayService::saveFireBaseGateway((object)$request->except('_token'), getBusiness($this->user));  
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
        return NotificationGatewayService::destroyFirebaseGateway(id: $id, user: getBusiness($this->user));
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
        $firebaseGateway = Setting::where('bo_id', getBusiness($this->user)->id)
                                        ->firebaseGateway()
                                        ->where('id',$request->input('id'))
                                        ->firstOrFail();
        $firebaseGateway->is_default = true;
        $firebaseGateway->save();
        
        Setting::where('bo_id', getBusiness($this->user)->id)
                    ->firebaseGateway()
                    ->where( 'id','!=',$request->input(key: 'id'))
                    ->update(['is_default' => false]);
                    
        return ApiResponse::asSuccess()
                                ->build();                                     
    }
}
