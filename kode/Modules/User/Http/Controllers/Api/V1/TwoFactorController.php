<?php

namespace Modules\User\Http\Controllers\Api\V1;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Services\TwoFactorService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TwoFactorController extends Controller
{
    
    public function __construct(protected TwoFactorService $twoFactorService){}


    /**
     * Summary of setup
     * @return JsonResponse|mixed
     */
    public function setup(): JsonResponse
    {
       return $this->twoFactorService->getSetupCodes();
    }


    /**
     * Summary of verify
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function verify(Request $request): JsonResponse
    {


        $validator = Validator::make($request->all(), rules: [
            'code'    => ['required','digits:6']
        ]);

        if ($validator->fails())  throw new ValidationException(validator: $validator,  response: ApiResponse::error(
                                            data: ['errors' => $validator->errors()],
                                            code: Response::HTTP_BAD_REQUEST
                                        ));

       return $this->twoFactorService->verify2faCode($request->input('code'));
    }

    
    /**
     * Summary of disable
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function disable(Request $request): JsonResponse
    {
        return $this->twoFactorService->disable2fa($request);
    }

   

    /**
     * Summary of regenerateRecoveryCodes
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function regenerateRecoveryCodes(Request $request): JsonResponse
    {
        return $this->twoFactorService->saveNewRecoveryCode($request);
    
    }

    
}
