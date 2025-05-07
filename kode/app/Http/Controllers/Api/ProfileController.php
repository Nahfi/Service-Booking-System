<?php

namespace App\Http\Controllers\Api\Business;

use App\Models\User;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;
use App\Traits\Common\Fileable;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Services\Business\ProfileService;
use App\Http\Requests\Business\ProfileUpdateRequest;
use App\Http\Requests\Business\PasswordUpdateRequest;

class ProfileController extends Controller
{
    use Fileable, ModelAction;

    protected ?User $user;

    public function __construct()
    {
        $this->user = getAuthUser('user:api');
    }

    /**
     * profileUpdate
     *
     * @param ProfileUpdateRequest $request
     * 
     * @return JsonResponse
     */
    public function profileUpdate(ProfileUpdateRequest $request): JsonResponse
    {
        ProfileService::saveUser($request, $this->user);

        $user = $this->user->load([

            'file', 
            'businessSetting', 
            'businessSetting.currency', 
            'businessSetting.language',
            'businessSetting.category'
        ]);

        return ApiResponse::asSuccess()
                            ->withData(resource: $user, resourceNamespace: UserResource::class)
                            ->withMessage(translate('Profile Updated'))
                            ->build();
    }

    /**
     * passwordUpdate
     *
     * @param PasswordUpdateRequest $request
     * 
     * @return JsonResponse
     */
    public function passwordUpdate(PasswordUpdateRequest $request): JsonResponse
    {
        $user = $this->user;

        if (!Hash::check($request->input('current_password'), $user->password))
            throw new \Exception(translate('Your Current Password does not match !!'), Response::HTTP_FORBIDDEN);

        $user->password = $request->input('password');
        $user->save();

        return ApiResponse::asSuccess()
                    ->withMessage(translate('Password Updated'))
                    ->build();
    }

    /**
     * updateFcmToken
     *
     * @param Request $request
     * 
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
        $this->user->fcm_token = $request->input('fcm_token');
        $this->user->save();
        return ApiResponse::asSuccess()
                        ->withData(resource: $this->user, resourceNamespace: UserResource::class)
                        ->withMessage(translate('Profile Updated'))
                        ->build();
    }
}
