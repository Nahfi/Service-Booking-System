<?php

namespace App\Http\Controllers\Api\Business\Subscription;

use App\Models\Subscription;
use App\Models\User;
use App\Models\PaymentLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Enums\Common\PaymentStatus;
use App\Enums\Common\Plan\PlanFeature;
use App\Enums\Common\Plan\PlanUpdateType;
use App\Facades\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Services\Business\Subscription\PaymentService;
use App\Http\Requests\Business\Subscription\PurchasePlanRequest;
use App\Http\Resources\Admin\SubscriptionResource;
use App\Http\Resources\PaymentGatewayResource;
use App\Http\Resources\PaymentLogResource;
use App\Models\Setting;
use App\Traits\Common\ModelAction;
use App\Traits\Common\Notify;
use App\Traits\Subscriptionable;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{

    use ModelAction, Subscriptionable, Notify;
    protected ?User $user ;

    public function __construct(protected PaymentService $paymentService)
    {
        $this->user = getAuthUser('user:api',[
                                                             'file',
                                                             'businessSetting',
                                                             'business'
                                                         ]);



                            
    }

    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [ new Middleware(middleware: 'business.permissions:view_plans', except: []) ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return PaymentService::getPricingPlans(getBusiness($this->user));
    }

    /**
     * subscribe
     *
     * @param PurchasePlanRequest $request
     * 
     * @return JsonResponse
     */
    public function subscribe(PurchasePlanRequest $request): JsonResponse
    {
        return PaymentService::purchasePlan((object) $request->except('_token'), getBusiness($this->user));
    }



    /**
     * Summary of createSubscriptionPayment
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\JsonResponse
     */
    public function createSubscriptionPayment(Request $request): JsonResponse{

        $user = getBusiness($this->user);

        $rules =  [
            'subscription_id'               => 'required|exists:subscriptions,id',
            'payment_gateway_id'            => 'required|exists:settings,id',
        ];

        $validator = Validator::make($request->all() ,rules: $rules);

        
        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
            data    : ['errors' => $validator->errors()],
            code    : Response::HTTP_BAD_REQUEST
        ));




        $subscription  = Subscription::with(['plan'])
                                          ->payLater()
                                          ->unpaid()
                                          ->where('bo_id',$user->id)
                                          ->where('id',$request->input('subscription_id'))
                                          ->firstOrfail();

                                        
        $plan =  $subscription?->plan;

        if(!$plan) throw new \Exception(translate('Invalid plan'),Response::HTTP_FORBIDDEN);



        $payment_gateway = Setting::where("id", $request->payment_gateway_id)
                                    ->paymentGateway()
                                    ->with(['parent'])
                                    ->first();


        if(!$payment_gateway)
                throw new \Exception(translate('Invalid payment method id'),Response::HTTP_FORBIDDEN);


            
                
        $requestParam = (object) [
            'total_employee' => $subscription->total_employee,
            'type'           => $subscription->type,
        ];

        $post_payment_data = $this->paymentService
                                  ->prepPaymentParams($requestParam, $user, $plan, $payment_gateway);


        return DB::transaction(function () use( $user, 
                                                           $plan, 
                                                           $payment_gateway, 
                                                           $subscription,
                                                           $post_payment_data): JsonResponse{  

            try {


                $log = $this->createPaymentLog(
                                    user: $user, 
                                    plan: $plan,
                                    payment_gateway: $payment_gateway, 
                                    post_payment_data: $post_payment_data
                                );


                $subscription->update(['payment_id' =>  $log?->id]);
            
                return ApiResponse::asSuccess()
                                    ->setBusiness($user)
                                    ->withData(resource: $log, resourceNamespace: PaymentLogResource::class)
                                    ->append('payment_gateway', new PaymentGatewayResource(  $payment_gateway))
                                    ->build();

            } catch (\Exception $ex) {

                throw new \Exception($ex->getMessage(),Response::HTTP_BAD_REQUEST);
            }
        });


                                        

    }



    /**
     * Summary of updateSubscriptionPlan
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function updateSubscriptionPlan(Request $request): JsonResponse{



        $user = getBusiness($this->user);

 

        $rules =  [
            'subscription_id'               => ['required','exists:subscriptions,id'],
            'payment_gateway_id'            => ['nullable','exists:settings,id'],
            'type'                          => ['required',Rule::in(PlanUpdateType::toArray())],
            'custom_subscription_feature'   => ["required", 'array'],
            'custom_subscription_feature.*' => ["required", Rule::in(PlanFeature::getPlanFeatures())],
        ];


        $validator = Validator::make($request->all() ,rules: $rules);

        
        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
            data    : ['errors' => $validator->errors()],
            code    : Response::HTTP_BAD_REQUEST
        ));




        $subscription  = Subscription::with(['plan'])
                                          ->running()
                                          ->where('bo_id',$user->id)
                                          ->where('id',$request->input('subscription_id'))
                                          ->firstOrfail();



     
        $subscriptionFeatures = $subscription->feature_allocation->initial_features;


        $requestFeatures = $request->input('custom_subscription_feature');




        $exists = !empty(array_filter($requestFeatures, function ($value) use ($subscriptionFeatures) {
            return in_array($value, $subscriptionFeatures);
        }));

        if($exists)
            throw new \Exception(translate('Invalid custom feature selected!! as some of the features already exists in subscription features'),Response::HTTP_FORBIDDEN);



                                        
        $plan =  $subscription?->plan;

        if(!$plan) throw new \Exception(translate('Invalid plan'),Response::HTTP_FORBIDDEN);



        $subscriptionPostData =  $this->getSubscriptionUpdatePostData($subscription , $request );



        if($request->input('type') ==  PlanUpdateType::USE_NOW->value || $request->input('type') ==  PlanUpdateType::PAY_WITH_PAYMENT_CYCLE->value){

  
            $subscription->update([
                'payment_amount'              => Arr::get($subscriptionPostData ,'payment_amount'),
                'custom_subscription_feature' => Arr::get($subscriptionPostData ,'custom_feature_configurations'),
                'is_partially_paid'           => true,
                'feature_allocation'          => [
                    'initial_features' =>  Arr::get($subscriptionPostData ,'plan_features')
                ]
            ]);


            return ApiResponse::asSuccess()
                        ->setBusiness($user)
                        ->withData(resource: $subscription, resourceNamespace: SubscriptionResource::class)
                        ->build();


        }


        



        $payment_gateway = Setting::where("id", $request->input('payment_gateway_id'))
                                    ->paymentGateway()
                                    ->with(['parent'])
                                    ->first();





        if(!$payment_gateway)
                throw new \Exception(translate('Invalid payment method id'),Response::HTTP_FORBIDDEN);






        $post_payment_data = $this->getSubscriptionUpdatePaymentPostData( $user  , $plan , $payment_gateway , $subscription,$subscriptionPostData );


        $log = $this->createPaymentLog(
            user: $user, 
            plan: $plan,
            payment_gateway: $payment_gateway, 
            post_payment_data: $post_payment_data
        );


        $subscription->update(
                                 [
                                         'payment_id' =>  $log?->id,
                                         'is_feature_payment' => true
                                    ]
                                );
        return ApiResponse::asSuccess()
                        ->setBusiness($user)
                        ->withData(resource: $log, resourceNamespace: PaymentLogResource::class)
                        ->append('payment_gateway', new PaymentGatewayResource(  $payment_gateway))
                        ->build();




    }


    
    /**
     * Summary of callBackIpn
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function callBackIpn(Request $request): JsonResponse
    {
        $payment_log = PaymentLog::with([ 'gateway' ])
                                        ->where("payment_status", PaymentStatus::INITIATE)
                                        ->where('trx_code',$request->input("trx_code"))
                                        ->firstOrFail();



        $gateway_service = 'App\\Http\\Services\\Gateway\\'.$payment_log?->gateway?->key.'\\Payment';
        
        return $gateway_service::ipn($request, $payment_log, $request->input("status"));
    }




}
