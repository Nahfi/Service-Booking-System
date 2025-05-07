<?php

namespace App\Http\Controllers\Api\Business;

use App\Models\User;
use App\Enums\Common\Status;
use Illuminate\Http\Request;
use App\Facades\ApiResponse;
use App\Models\BusinessRole;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Traits\Common\ModelAction;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Business\RoleRequest;
use App\Http\Services\Business\RoleService;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controllers\HasMiddleware;

class RoleController extends Controller implements HasMiddleware
{
    use ModelAction;

    protected ?User $user;

    public function __construct()
    {
        $this->user = getAuthUser('user:api', ['business']);
    }

    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'business.permissions:view_roles', only: ['index']),
            new Middleware(middleware: 'business.permissions:save_role', only: [
                'store',
                'update',
                'updateStatus'
            ]),
            new Middleware(middleware: 'business.permissions:delete_role', only: ['destroy'])
        ];
    }

    /**
     * index
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        
        return RoleService::getRoles(getBusiness($this->user));
    }

    /**
     * store
     *
     * @param RoleRequest $request
     * 
     * @return JsonResponse
     */
    public function store(RoleRequest $request): JsonResponse
    {
        
        return RoleService::save((object) $request->except('_token'), getBusiness($this->user));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * update
     *
     * @param RoleRequest $request
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function update(RoleRequest $request, string $id): JsonResponse
    {
        
        return RoleService::save((object) $request->except('_token'), getBusiness($this->user));
    }

    /**
     * destroy
     *
     * @param string $id
     * 
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        
        return RoleService::destroy($id,getBusiness($this->user));
    }
   
    /**
     * updateStatus
     *
     * @param Request $request
     * 
     * @return JsonResponse
     */
    public function updateStatus(Request $request): JsonResponse
    {
        
        $validator = Validator::make($request->all(), rules: [
            'id'    => 'required|exists:business_roles,id',
            'value' => ['required', new Enum(Status::class)],
        ]);

        if ($validator->fails())  throw new ValidationException(validator: $validator,  response: ApiResponse::error(
            data: ['errors' => $validator->errors()],
            code: Response::HTTP_BAD_REQUEST
        ));

        return $this->changeStatus(request: $request->except(keys: "_token"), actionData: [
            "model"                 => new BusinessRole(),
            "filterable_attributes" => ['id' => $request->input(key: 'id'), 'bo_id' => getBusiness($this->user)->id],
        ]);
    }
}
