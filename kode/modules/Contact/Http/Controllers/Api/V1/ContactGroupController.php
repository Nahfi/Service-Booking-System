<?php

namespace Modules\Contact\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Routing\Controller;
use Modules\Contact\Http\Services\ContactService;
use Modules\Contact\Http\Requests\Api\V1\ContactGroupRequest;

class ContactGroupController extends Controller
{
    use ModelAction;

    public function __construct(protected ContactService $contactService)
    {
        //todo: Check Model Action function under permission
        $this->middleware('user.permission.check:view_contact_group')
                ->only(['index']);
        $this->middleware('user.permission.check:save_contact_group')
                ->only(['store', 'update', 'updateStatus', 'bulkAction']);
        $this->middleware('user.permission.check:destroy_contact_group')
                ->only('destroy');
    }

    /**
     * index
     *
     * @param string|null $is_trashed
     * 
     * @return JsonResponse
     */
    public function index(string|null $is_trashed): JsonResponse{

        return $this->contactService->getContactGroups(isTrashed: !is_null($is_trashed));
    }

    /**
     * store
     *
     * @param ContactGroupRequest $request
     * 
     * @return JsonResponse
     */
    public function store(ContactGroupRequest $request): JsonResponse {

        return $this->contactService->saveContactGroup($request);
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

        return $this->contactService->saveContactGroup($request, $uid);
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

        return $this->contactService->deleteContactGroup($uid);
    }

    //todo: Make Contact restore functionality
    //todo: Make Contact permanenetly delete functionality
}
