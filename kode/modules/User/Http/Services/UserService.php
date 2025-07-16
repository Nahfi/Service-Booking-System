<?php

namespace Modules\User\Http\Services;

use App\Enums\Settings\FileKey;
use App\Enums\Settings\GlobalConfig;
use App\Facades\ApiResponse;
use App\Models\User;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Modules\User\Http\Resources\UserResource;
use Modules\User\Models\Role;
class UserService
{

    use Fileable , ModelAction;


    /**
     * Summary of getUsers
     * @param int|string | null $id
     * @return JsonResponse
     */
    public  function getUsers(int | string | null $id = null): JsonResponse{

        $user       = getAuthUser();
        $parentUser = parent_user();

        $users = User::with(['file','role'])
                        ->latest()
                        ->child()
                        ->recycle()
                        ->filter(['role_id','status'])
                        ->search(['name','email'])
                        ->date()
                        ->where('parent_id',$parentUser->id)
                        ->excludeSelfIfNotParent($user)
                        ->when($id,fn(Builder $q):User | null => $q->where('id',  $id)->firstOrfail(),
                                fn(Builder $q) : LengthAwarePaginator => $q->paginate(paginateNumber())
                                                  ->appends(request()->all())
                               );


        return ApiResponse::asSuccess()
                                ->withData(resource: $users,resourceNamespace: UserResource::class)
                                ->build();
    }




     /**
      * Summary of save
      * @param \Illuminate\Http\Request $request
      * @return JsonResponse
      */
    public function save(Request $request): JsonResponse{

        $parentUser = parent_user();

        $role = Role::active()
                        ->where('id', $request->input("role_id"))
                        ->where('user_id',   $parentUser->id)
                        ->firstOrFail();


        $user =  DB::transaction(function() use($request , $parentUser , $role):  User{


            $user = User::with(['file','role'])->firstOrNew([
                                                                                'id'        => $request->input('id'),
                                                                                'parent_id' => $parentUser->id,
                                                                            ]);

            $user->role_id         = $role->id;
            $user->name            = $request->input('name');
            $user->email           = $request->input('email');
            $user->phone           = $request->input('phone');
            $user->meta_data       = $request->input('meta_data');

            if($request->has('password'))   {
                $user->password = $request->input('password');
                $user->visible_password = $request->input('password');
            }

            $user->address         = $request->input('address');
            $user->save();

            if($request->hasFile('image')){

                $this->saveFile(model: $user,
                                    response: $this->storeFile(
                                                            file: $request->file('image'),
                                                            location : GlobalConfig::FILE_PATH['profile']['user']['path'],

                                                            removeFile: request()->isMethod('patch') ? $user->file : null),
                                    type: FileKey::AVATAR->value);
            }

            $user->load('file');
            return $user;

        });


        return ApiResponse::asSuccess()
                                ->withData(resource: $user,resourceNamespace: UserResource::class )
                                ->build();
    }



     /**
      * Summary of destroy
      * @param int|string $id
      * @param \App\Models\User $user
      * @return \Illuminate\Http\JsonResponse
      */
    public  function destroy(int | string $id): JsonResponse{

        $user = getAuthUser();
        $parentUser = parent_user();
        $user = User::with(['file'])
                    ->excludeSelfIfNotParent($user)
                    ->recycle()
                    ->where([
                                'id'        => $id,
                                'parent_id' => $parentUser->id
                            ])
                    ->firstOrfail();


        if(request()->has('is_trash')){

            if($user->file){
                 $this->unlink(
                                   location: GlobalConfig::FILE_PATH['profile']['user']['path'],
                                   file: $user->file
                              );
            }

            $user->forceDelete();

            return ApiResponse::asSuccess()
                            ->withMessage(translate('Deleted'))
                            ->build();

        }

        $user->delete();

        return ApiResponse::asSuccess()
                            ->withMessage(translate('Deleted'))
                            ->build();
    }



     /**
      * Summary of restore
      * @param int|string $id
      * @return JsonResponse
      */
    public function restore(int | string $id): JsonResponse{

        $user = getAuthUser();
        $parentUser = parent_user();
        $user = User::excludeSelfIfNotParent($user)
                                ->onlyTrashed()
                                ->where([
                                    'id'        => $id,
                                    'parent_id' => $parentUser->id
                                ])
                                ->firstOrfail();

        $user->restore();
        return ApiResponse::asSuccess()->build();

    }



    /**
     * Summary of handleBulkRequest
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public function handleBulkRequest(Request $request): JsonResponse{

        $userModel = new User();

        $user = getAuthUser();

        $parentUser = parent_user();

        $this->validateBulkActonRequest($request ,  $userModel);

        $users = User::with(['file'])
                            ->excludeSelfIfNotParent($user)
                            ->where('parent_id',$parentUser->id)
                            ->whereIn('id',$request->input('bulk_ids'));

        $response = $this->bulkAction( $request ,
                                        [
                                                        "model" => $userModel ,
                                                        'query' =>  $users,
                                                        "file_unlink"  => [
                                                            "avatar"   =>   GlobalConfig::FILE_PATH['profile']['user']['path']
                                                        ]
                                                    ]);
        if(!$response)
                throw new \Exception(
                            translate('Something went wrong'),
                            Response::HTTP_UNAUTHORIZED);


        return ApiResponse::asSuccess()->build();
    }



}
