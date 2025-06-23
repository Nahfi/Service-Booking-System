<?php

namespace Modules\User\Http\Services;
use App\Facades\ApiResponse;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\User\Http\Resources\RoleResource;
use Modules\User\Models\Role;

class RoleService 
{

     
     /**
      * Summary of getRoles
      * @param int|string|null $id
      * @return JsonResponse
      */
     public  function getRoles(int| string | null $id = null): JsonResponse{


          $roles = Role::search(['name'])
                              ->date()
                              ->latest()
                              ->when($id,fn(Builder $q):Role | null => $q->where('id',  $id)->firstOrfail(),
                                         fn(Builder $q): Collection => $q->get()
                               );


          return ApiResponse::asSuccess()
                                   ->withData(resource: $roles,resourceNamespace: RoleResource::class )
                                   ->build();
     }

     
   

     /**
      * Summary of save
      * @param \Illuminate\Http\Request $request
      * @return JsonResponse
      */
     public function save(Request $request): JsonResponse{

        $permissions = [];

        collect($request->permissions)->map(function(array $value , string $key) use(&$permissions): void{
            $permissions[$key] = array_values($value);
        });


        $role = Role::firstOrNew([
                              'id'      => $request->input('id')
                         ]);

        $role->name           = $request->name;
        $role->permissions    = $permissions;
        $role->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $role,resourceNamespace: RoleResource::class )
                                ->build();
     }
   
     

     /**
      * Summary of destroy
      * @param int|string $id
      * @param \App\Models\User $user
      * @return \Illuminate\Http\JsonResponse
      */
     public  function destroy(int | string $id ): JsonResponse{
          

          $role = Role::withCount(['users'])
                                        ->where('id', $id)
                                        ->firstOrFail();

          if($role->users_count > 0) 
               throw new Exception(
                    translate(value: "This role cannot be deleted because it has users assigned to it"), 
                    Response::HTTP_FORBIDDEN);
                    
          $role->delete();

          return ApiResponse::asSuccess()
                              ->withMessage(translate('Role Deleted'))
                              ->build();
     }
   
}
