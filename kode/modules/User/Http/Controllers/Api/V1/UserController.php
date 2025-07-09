<?php

namespace Modules\User\Http\Controllers\Api\V1;

use App\Enums\Common\Status;
use App\Facades\ApiResponse;
use App\Models\User;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;
use Modules\User\Http\Requests\UserRequest;
use Modules\User\Http\Services\UserService;

class UserController extends Controller
{

    use ModelAction;

    public function __construct(protected UserService $userService)
    {
        $this->middleware('user.permission.check:view_user')->only(['index','show']);
        $this->middleware('user.permission.check:save_user')->only(['store', 'update', 'updateStatus']);
        $this->middleware('user.permission.check:destroy_user')->only('destroy');
    }


    /**
     * Summary of index
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->userService->getUsers();
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(UserRequest $request): JsonResponse
    {
        return $this->userService->save($request);
    }



    /**
     * Summary of show
     * @param int|string $id
     * @return JsonResponse
     */
    public function show(int | string $id): JsonResponse
    {
        return $this->userService->getUsers($id);
    }



    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(UserRequest $request, $id): JsonResponse
    {
       return $this->userService->save($request);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy(int | string $id): JsonResponse
    {
        return $this->userService->destroy($id);
    }



    /**
     * Summary of restore
     * @param mixed $id
     * @return JsonResponse
     */
    public function restore(int | string $id): JsonResponse
    {
        return $this->userService->restore($id);
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
            "model"                 => new User(),
            "filterable_attributes" => ['id' => $request->input(key: 'id'), 'parent_id' => parent_user()->id],
            'recycle'               => request()->has('is_trash')
        ]);
    }



    /**
     * Summary of bulk
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public function bulk(Request $request): JsonResponse{

        return $this->userService->handleBulkRequest( $request);
    }
}
