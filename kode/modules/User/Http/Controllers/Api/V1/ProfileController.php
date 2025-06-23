<?php

namespace Modules\User\Http\Controllers\Api\V1;

use App\Facades\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Requests\PasswordUpdateRequest;
use Modules\User\Http\Requests\ProfileRequest;
use Modules\User\Http\Services\ProfileService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function __construct(protected ProfileService $profileService){}
   
    /**
     * Summary of update
     * @param \Modules\User\Http\Requests\ProfileRequest $request
     * @param int|string $id
     * @return JsonResponse
     */
    public function update(ProfileRequest $request, int | string $id): JsonResponse
    {
        return $this->profileService->update($request);
    }

     
    /**
     * Summary of passwordUpdate
     * @param \Modules\User\Http\Requests\PasswordUpdateRequest $request
     * @return JsonResponse
     */
    public function passwordUpdate(PasswordUpdateRequest $request): JsonResponse
    {
        return $this->profileService->updatePassword($request);

    }


    
    /**
     * Summary of updateFcmToken
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return JsonResponse
     */
    public function updateFcmToken(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), rules: [
            'fcm_token' => 'required|string',
        ]);

        if ($validator->fails())
                    throw new ValidationException(
                        validator: $validator,
                        response: ApiResponse::error(
                            data: ['errors' => $validator->errors()],
                            code: Response::HTTP_BAD_REQUEST
                        )
                    );

        return $this->profileService->updateFirebaseToken($request);

    }




    /**
     * Summary of toggleOnlineStatus
     * @return JsonResponse
     */
    public function toggleOnlineStatus(): JsonResponse{

        return $this->profileService->switchOnlineStatus();

    }


    /**
     * Summary of destroyAccount
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyAccount(Request $request): JsonResponse
    {
        return $this->profileService->destroy($request);
    }

}
