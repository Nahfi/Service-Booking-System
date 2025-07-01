<?php

namespace Modules\Contact\Http\Controllers\Api\V1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use App\Traits\Common\ModelAction;
use Modules\Contact\Models\Contact;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;
use Modules\Contact\Http\Requests\Api\V1\ContactFavoriteRequest;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupAttachmentRequest;

class ContactController extends Controller
{
    use ModelAction;

    public function __construct(protected ContactService $contactService)
    {
        $this->middleware('user.permission.check:view_contact')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_contact')
                ->only(['store', 'update', 'updateStatus', 'updateFavorites', 'updateContactGroupAttachments', 'bulk']);
        $this->middleware('user.permission.check:destroy_contact')
                ->only(['destroy', 'restore']);
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse{

        return $this->contactService->getContacts();
    }

    /**
     * store
     *
     * @param ContactRequest $request
     * 
     * @return JsonResponse
     */
    public function store(ContactRequest $request): JsonResponse {

        return $this->contactService->saveContact(request: $request);
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
        return $this->contactService->getContacts(uid: $uid);
    }

    /**
     * update
     *
     * @param ContactRequest $request
     * @param string|null|null $uid
     * 
     * @return JsonResponse
     */
    public function update(ContactRequest $request, string|null $uid = null): JsonResponse {

        return $this->contactService->saveContact(request: $request, uid: $uid);
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
            'uid'   => 'required|exists:contacts,uid',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,response: ApiResponse::error(
                data: ['errors' => $validator->errors()],
                code: Response::HTTP_BAD_REQUEST
            ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new Contact(),
            "filterable_attributes" => ['uid' => $request->input(key: 'uid'), 'user_id' => parent_user()->id],
        ]);
    }

    /**
     * updateFavorites
     *
     * @param ContactFavoriteRequest $request
     * 
     * @return JsonResponse
     */
    public function updateFavorites(ContactFavoriteRequest $request): JsonResponse{
        
        return $this->contactService->updateContactFavorites(request: $request);
    }

    /**
     * bulk
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function bulk(Request $request): JsonResponse{

        return $this->contactService->handleContactBulkRequest(request: $request);
    }

    /**
     * updateContactGroupAttachments
     *
     * @param ContactGroupAttachmentRequest $request
     * 
     * @return JsonResponse
     */
    public function updateContactGroupAttachments(ContactGroupAttachmentRequest $request): JsonResponse{

        return $this->contactService->updateContactGroupAttachments(request: $request);
    }

    /**
     * destroy
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function destroy(string|null $uid): JsonResponse {

        return $this->contactService->destroyContact(uid: $uid);
    }

    /**
     * restore
     *
     * @param string|null $uid
     * 
     * @return JsonResponse
     */
    public function restore(string|null $uid = null): JsonResponse
    {
        return $this->contactService->restoreContact($uid);
    }
}
