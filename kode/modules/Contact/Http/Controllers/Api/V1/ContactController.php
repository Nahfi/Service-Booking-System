<?php

namespace Modules\Contact\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Routing\Controller;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Http\Requests\Api\V1\ContactRequest;

class ContactController extends Controller
{
    use ModelAction;

    public function __construct(protected ContactService $contactService)
    {
        //todo: Check Model Action function under permission
        $this->middleware('user.permission.check:view_contact')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_contact')
                ->only(['store', 'update', 'updateStatus', 'bulkAction']);
        $this->middleware('user.permission.check:destroy_contact')
                ->only('destroy');
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

    //todo: Make Contact Status Update functionality
    //todo: Make Contact Favorite functionality
    //todo: Make Contact Bulk functionality
    //todo: Make Contact Attach/Detach Group functionality

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

    //todo: Make Contact restore functionality
}
