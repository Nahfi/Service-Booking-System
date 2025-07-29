<?php

namespace App\Http\Services\User;


use App\Enums\Settings\FileKey;
use App\Enums\Settings\GlobalConfig;
use App\Facades\ApiResponse;
use App\Models\User;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Resources\UserResource;


class ProfileService
{

    use Fileable , ModelAction;




    /**
     * Summary of update
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request): JsonResponse{


        $user = getAuthUser('user:api',['file']);


        $user =  DB::transaction(function() use($request , $user): User{

                    $user->name            = $request->input('name');
                    $user->email           = $request->input('email');
                    $user->phone           = $request->input('phone');
                    $user->meta_data       = $request->input('meta_data');

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
     * Summary of updateFirebaseToken
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updateFirebaseToken(Request $request): JsonResponse{

        $user = getAuthUser('user_api');
        $user->fcm_token = $request->input('fcm_token');
        $user->save();

        return ApiResponse::asSuccess()
                    ->withData(resource: $user,resourceNamespace: UserResource::class )
                    ->build();

    }



    /**
     * Summary of updatePassword
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updatePassword(Request $request): JsonResponse{


        $user = getAuthUser('user_api');

        if (!Hash::check($request->input('current_password'), $user->password))
               throw new \Exception(translate('Your Current Password does not match !!'), Response::HTTP_FORBIDDEN);


        $user->password = $request->input('password');
        $user->visible_password = $request->input('password');
        $user->save();

        return ApiResponse::asSuccess()
                             ->build();

    }




}
