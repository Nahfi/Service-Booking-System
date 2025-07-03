<?php

namespace Modules\Contact\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Contact\Http\Requests\Api\V1\ContactImportRequest;
use Modules\Contact\Http\Services\ContactService;

class ContactImportController extends Controller
{
    public function __construct(protected ContactService $contactService)
    {
        $this->middleware('user.permission.check:view_contact_import')
                ->only(['index', 'show']);
        $this->middleware('user.permission.check:save_contact_import')
                ->only([]);
        $this->middleware('user.permission.check:destroy_contact_import')
                ->only(['destroy']);
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->contactService->getContactImports();
    }

    /**
     * store
     *
     * @param ContactImportRequest $request
     * 
     * @return JsonResponse
     */
    public function store(ContactImportRequest $request): JsonResponse
    {
        return $this->contactService->importContacts($request);
    }

    /**
     * show
     *
     * @param string|int|null $id
     * 
     * @return JsonResponse
     */
    public function show(string|int|null $id = null): JsonResponse
    {
        return $this->contactService->getContactImports(id: $id);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * toggleImportPause
     *
     * @param int|string|null $id
     * 
     * @return JsonResponse
     */
    public function toggleImportPause(int|string|null $id = null): JsonResponse
    {
        return $this->contactService->pauseResumeImport(id: $id);
    }

    /**
     * destroy
     *
     * @param mixed $id
     * 
     * @return JsonResponse
     */
    public function destroy(int|string|null $id = null): JsonResponse
    {
        return $this->contactService->destroyImport(id: $id);
    }
}
