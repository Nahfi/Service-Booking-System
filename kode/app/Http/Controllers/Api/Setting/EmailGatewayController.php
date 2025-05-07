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
use Database\Seeders\Business\NotificationGatewaySeeder;
use App\Http\Services\Business\Settings\NotificationGatewayService;

class EmailGatewayController extends Controller implements HasMiddleware
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
            new Middleware(middleware: 'business.permissions:view_gateway', only: [
                'index',
                'importEmailGateway'
            ]),
            new Middleware(middleware: 'business.permissions:save_gateway', only: [
                'update',
                'store',
                'makeDefault'
            ]),
        ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse{

        return NotificationGatewayService::getMailgateways(getBusiness($this->user));
    }


        /**
     * Summary of testGateway
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function testGateway(Request $request): JsonResponse{

        $validator = Validator::make($request->all() ,rules: [
            'gateway_id'            => 'required|exists:settings,id',
            'email'                 => 'required|email',
        ]);

        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
                                                    data    : ['errors' => $validator->errors()],
                                                    code    : Response::HTTP_BAD_REQUEST
                                                ));


        try {

            return NotificationGatewayService::testMailGateway((object)$request->except('_token') , getBusiness($this->user));  

        } catch (\Exception $ex) {
          
            return ApiResponse::error(
                data    : ['error' => $ex->getMessage()],
                code    : Response::HTTP_INTERNAL_SERVER_ERROR
            )->build();

        }
        

        

          

    }









     /**
     * store
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse{

     
        $validator = Validator::make($request->all() ,rules: [
                        'value' => 'required|array',
                        'value.name' => 'required|string|max:150',
                        'value.driver' => 'required|string|max:150',
                        'value.from.address' => 'required|email|max:150',
                        'value.from.name' => 'required|string|max:150',
                        'value.host' => 'required|string|max:150',
                        'value.port' => 'required|integer',
                        'value.username' => 'required|string|max:150',
                        'value.password' => 'required|string|max:150',
                        'value.encryption' => 'required|string|max:150',
                        'value.template_ids' => 'nullable|array',
                        'value.template_ids.*' => 'exists:notification_templates,id',
                   ]);



        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data : ['errors' => $validator->errors()],
                    code : Response::HTTP_BAD_REQUEST
                ));

        
                           

        return NotificationGatewayService::storeMailGateway((object)$request->except('_token'), getBusiness($this->user));  
        
    }


    
    /**
     * update
     *
     * @param Request $request
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function update(Request $request, string $id): JsonResponse{

        $validator = Validator::make($request->all() ,rules: [
            'id'      => 'required|exists:settings,id',
            'value'   => 'required|array',
            'value.*' => 'required|max:150',
            'value.template_ids' => 'nullable|array',
            'value.template_ids.*' => 'nullable|exists:notification_templates,id',
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data : ['errors' => $validator->errors()],
                    code : Response::HTTP_BAD_REQUEST
                ));
                                                                

        return NotificationGatewayService::updateMailGateway((object)$request->except('_token'), getBusiness($this->user));  
        
    }


















     /**
     * importEmailGateway
     *
     * @return JsonResponse
     */
    public function importEmailGateway(): JsonResponse{

        $mailGatewaysCounter = Setting::where('bo_id', getBusiness($this->user)->id)
                                        ->mailGateway()
                                        ->count();

        if ($mailGatewaysCounter < 1){
            
            (new NotificationGatewaySeeder())->run($this->user);
                    return ApiResponse::asSuccess()
                                            ->build();             
        } 

        return ApiResponse::asError()
                                ->withMessage(translate(value: 'Mail gateway settings already exist for this Business.'))
                                ->withHttpCode(Response::HTTP_CONFLICT)
                                ->build();
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
        
        $mailGateway = Setting::where('bo_id', getBusiness($this->user)->id)
                                    ->mailGateway()
                                    ->where('id',$request->input('id'))
                                    ->firstOrFail();

        $mailGateway->is_default = true;
        $mailGateway->save();
        
        Setting::where('bo_id', getBusiness($this->user)->id)
                    ->mailGateway()
                    ->where( 'id','!=',$request->input(key: 'id'))
                    ->update(['is_default' => false]);

        return ApiResponse::asSuccess()
                                ->build();                                       
    }

   
}
