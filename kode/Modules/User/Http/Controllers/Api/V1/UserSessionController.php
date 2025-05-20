<?php

namespace Modules\User\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Services\ProfileService;


class UserSessionController extends Controller
{



    public function __construct(protected ProfileService $profileService){}


    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index():JsonResponse
    {
        return $this->profileService->getUserSession();
    }
    



    /**
     * Summary of logoutOtherSessions
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function logoutOtherSessions(Request $request): JsonResponse{

        return $this->profileService->logOutFromOtherDevices($request);

    }

   
}
