<?php

namespace Modules\User\Http\Controllers\Api\V1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Requests\RoleRequest;
use Modules\User\Http\Services\RoleService;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\User\Models\Role;

class RoleController extends Controller 
{

    use ModelAction;


    public function __construct(protected RoleService $roleService)
    {
        $this->middleware('user.permission.check:view_role')->only(['index','show']);
        $this->middleware('user.permission.check:save_role')->only(['store', 'update', 'updateStatus']);
        $this->middleware('user.permission.check:destroy_role')->only('destroy');
    }


    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->roleService->getRoles();
    }



    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(RoleRequest $request): JsonResponse
    {
        return $this->roleService->save($request);
    }

   

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(RoleRequest $request, int | string  $id): JsonResponse
    {
        return $this->roleService->save($request);
    }




    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
        return $this->roleService->getRoles($id);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy(int | string $id): JsonResponse
    {
        return $this->roleService->destroy($id);
    }



    /**
     * Summary of updateStatus
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return JsonResponse
     */
    public function updateStatus(Request $request): JsonResponse{
        
        $validator = Validator::make($request->all(), rules: [
            'id'    => 'required|exists:roles,id',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  throw new ValidationException(validator: $validator,  response: ApiResponse::error(
            data: ['errors' => $validator->errors()],
            code: Response::HTTP_BAD_REQUEST
        ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new Role(),
            "filterable_attributes" => ['id' => $request->input(key: 'id')]
        ]);
    }
}
