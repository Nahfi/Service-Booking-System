<?php

namespace Modules\Settings\Http\Controllers\Api\V1;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Settings\Http\Services\SettingsService;

class SettingsController extends Controller
{


    public function __construct(protected SettingsService $settingsService)
    {
        $this->middleware('user.permission.check:view_setting')->only('index');
        $this->middleware('user.permission.check:save_setting')->only(['store']);
    }



    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index():JsonResponse
    {
        return $this->settingsService->getSettings();
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): JsonResponse
    {

        $validator   = Validator::make( 
                                        data     : $request->all(),
                                        rules    : [
                                                        'site_settings' => ['required','array']
                                                   ] 
                                        );

        if ($validator->fails())  
                throw new ValidationException(validator: $validator,  
                    response: ApiResponse::error(
                        data : ['errors' => $validator->errors()],
                        code : Response::HTTP_BAD_REQUEST
                    )); 

        return $this->settingsService->save($request);
    }


   
}
