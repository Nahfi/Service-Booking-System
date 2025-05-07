<?php

namespace App\Http\Controllers\Api\Business\Setting;

use App\Models\User;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Business\FaqRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Http\Requests\Business\Setting\KycRequest;
use App\Http\Requests\Business\Setting\TicketRequest;
use App\Http\Services\Business\Settings\GeneralService;
use App\Http\Requests\Business\Setting\LogoStoreRequest;
use App\Models\Setting;

class GeneralSettingController extends Controller implements HasMiddleware
{
    protected ?User $user;

    public function __construct()
    {
        $this->user = getAuthUser('user:api', ['business', 'business.businessSetting', 'businessSetting']);


    }

    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [

            new Middleware(middleware: 'business.permissions:view_settings', only: [
                'getConfiguration',
                'getDefaultSettings',
                'getFaqs'
            ]),
            
            new Middleware(middleware: 'business.permissions:save_settings', only: [
                'save',
                'ticketConfigurationSave',
                'kycConfigurationSave',
                'logoSave',
                'saveFaq',
                'deleteFaq'
            ]),
        ];
    }

     /**
     * Summary of guestConfiguration
     * @return \Illuminate\Http\JsonResponse
     */
    public function guestConfiguration(): JsonResponse{
 
        return GeneralService::getGuestConfiguration($this->user ? getBusiness($this->user) : null);       
    }

    /**
     * getConfiguration
     *
     * @return JsonResponse
     */
    public function getConfiguration(): JsonResponse{
        
        return GeneralService::getConfiguration();       
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return GeneralService::getDefaultSettings(getBusiness($this->user));
    }

    /**
     * save
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function save(Request $request): JsonResponse{

        try {
            
            if(!$request->input('site_settings') || 
                !$request->input('sub_group') ||
                !is_array($request->input('site_settings')))  
                    throw new \Exception(
                            translate('Site settings & sub group field is required'),Response::HTTP_BAD_REQUEST);

            $validations = GeneralService::getDefaultValidationRules(request_data: $request->input(key: 'site_settings'));
            $validator   = Validator::make( data     : $request->all(),
                                            rules    : $validations['rules'] ,
                                            messages : $validations['messages']);

            if ($validator->fails())  
                throw new ValidationException(validator: $validator,  
                    response: ApiResponse::error(
                        data : ['errors' => $validator->errors()],
                        code : Response::HTTP_BAD_REQUEST
                    )); 
                            
            return GeneralService::saveDefaultSettings(settings: (object)$request->input('site_settings'), user: getBusiness($this->user));
          
        } catch (\Exception $exception) {
            
            throw new \Exception($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);

        }
    }






    
  

    /**
     * Summary of getFaqs
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFaqs(): JsonResponse{

        try {
            
            return GeneralService::getFaqs(getBusiness($this->user));

        } catch (\Exception $exception) {
            
            throw new \Exception($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }




    /**
     * Summary of saveFaq
     * @param \App\Http\Requests\Business\FaqRequest $request
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveFaq(FaqRequest $request): JsonResponse{

        try {
            
            return GeneralService::saveFaqs(request: (object) $request->except('_token'), user: getBusiness($this->user));
          
        } catch (\Exception $exception) {
            
            throw new \Exception($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    
    /**
     * Summary of saveFaq
     * @param \App\Http\Requests\Business\FaqRequest $request
     * @throws \Exception
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteFaq(int | string $id): JsonResponse{

        try {
            

            $user = getBusiness($this->user);


            Setting::where('id',$id)
                    ->where('bo_id',$user->id)
                    ->delete();
            return ApiResponse::asSuccess()->build();



          
        } catch (\Exception $exception) {
            
            throw new \Exception($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * ticketConfigurationSave
     *
     * @param TicketRequest $request
     * 
     * @return JsonResponse
     */
    public function ticketConfigurationSave(TicketRequest $request): JsonResponse{
        
        
        return GeneralService::saveTicketSetting((object)$request->except('_token'), getBusiness($this->user));  
    }

    /**
     * kycConfigurationSave
     *
     * @param KycRequest $request
     * 
     * @return JsonResponse
     */
    public function kycConfigurationSave(KycRequest $request): JsonResponse{
       
        
        return GeneralService::saveKycSetting((object)$request->except('_token'), getBusiness($this->user));  
    }

    /**
     * logoSave
     *
     * @param LogoStoreRequest $request
     * 
     * @return JsonResponse
     */
    public function logoSave(LogoStoreRequest $request): JsonResponse{

        
        return GeneralService::saveLogo($request, getBusiness($this->user));  
    }

    
}
