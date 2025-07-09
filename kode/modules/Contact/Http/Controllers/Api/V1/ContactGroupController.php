<?php

namespace Modules\Contact\Http\Controllers\Api\V1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rules\Enum;
use Modules\Contact\Models\ContactGroup;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;

class ContactGroupController extends Controller
{
    use ModelAction;

    public function __construct(protected ContactService $contactService)
    {
        $this->middleware('user.permission.check:view_contact_group')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_contact_group')
                ->only(['store', 'update', 'updateStatus']);
        $this->middleware('user.permission.check:destroy_contact_group')
                ->only(['destroy', 'restore']);
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse{

        return $this->contactService->getContactGroups();
    }

    /**
     * store
     *
     * @param ContactGroupRequest $request
     * 
     * @return JsonResponse
     */
    public function store(ContactGroupRequest $request): JsonResponse {

        return $this->contactService->saveContactGroup(request: $request);
    }

    /**
     * show
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function show(string|null $uid = null): JsonResponse
    {
        return $this->contactService->getContactGroups(uid: $uid);
    }

    /**
     * update
     *
     * @param ContactGroupRequest $request
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function update(ContactGroupRequest $request, string|null $uid = null): JsonResponse {

        return $this->contactService->saveContactGroup(request: $request, uid: $uid);
    }

    /**
     * updateStatus
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function updateStatus(Request $request): JsonResponse{
        
        $validator = Validator::make($request->all(), rules: [
            'uid'   => 'required|exists:contact_groups,uid',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,response: ApiResponse::error(
                data: ['errors' => $validator->errors()],
                code: Response::HTTP_BAD_REQUEST
            ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new ContactGroup(),
            "filterable_attributes" => ['uid' => $request->input(key: 'uid'), 'user_id' => parent_user()->id],
        ]);
    }

    /**
     * destroy
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function destroy(string|null $uid): JsonResponse {

        return $this->contactService->destroyContactGroup($uid);
    }

    /**
     * restore
     *
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function restore(string|null $uid = null): JsonResponse
    {
        return $this->contactService->restoreContactGroup($uid);
    }
}
