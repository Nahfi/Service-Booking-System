<?php

namespace Modules\UserMessaging\Http\Controllers\Api\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\UserMessaging\Http\Requests\UserMessageReactionRequest;
use Modules\UserMessaging\Http\Requests\UserMessageRequest;
use Modules\UserMessaging\Http\Requests\UserMessageUpdateRequest;
use Modules\UserMessaging\Http\Services\MessageService;


class MessageController extends Controller
{


    public function __construct(protected MessageService $messageService)
    {
        $this->middleware('user.permission.check:view_message');
    }


    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->messageService->getConversationList();
    }



    /**
     * Summary of store
     * @param \Modules\UserMessaging\Http\Requests\UserMessageRequest $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function store(UserMessageRequest $request): JsonResponse
    {
        return $this->messageService->save($request);
    }




    /**
     * Summary of update
     * @param \Modules\UserMessaging\Http\Requests\UserMessageUpdateRequest $request
     * @param int|string $id
     * @return JsonResponse
     */
    public function update(UserMessageUpdateRequest $request, int | string $id): JsonResponse
    {
       return $this->messageService->update($request);
    }



    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show(int | string $id ): JsonResponse
    {
        $userId = request()->input('user_id');
        return $this->messageService->getConversationMessages($id  ,  $userId);
    }



    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy(int | string $id): JsonResponse
    {
        return $this->messageService->destroy($id);
    }




    /**
     * Summary of toggleReaction
     * @param \Modules\UserMessaging\Http\Requests\UserMessageReactionRequest $request
     * @param int|string $conversationId
     * @param int|string $messageId
     * @return JsonResponse
     */
    public  function toggleReaction(UserMessageReactionRequest $request , int | string $conversationId , int | string $messageId): JsonResponse{

        return $this->messageService->toggleReaction($request , $conversationId , $messageId);

    }



    /**
     * Summary of toggleMute
     * @param int $conversationId
     * @return JsonResponse
     */
    public function toggleMute(int $conversationId): JsonResponse{
        return $this->messageService->toggleMute($conversationId);
    }


    /**
     * Summary of toggleBlock
     * @param int $conversationId
     * @return JsonResponse
     */
    public function toggleBlock(int  $conversationId): JsonResponse{
        return $this->messageService->toggleBlock($conversationId);
    }




    /**
     * Summary of destroy
     * @param int $conversationId
     * @return JsonResponse
     */
    public function destroyConversation(int $conversationId): JsonResponse{
        return $this->messageService->destroyConversation($conversationId);
    }
}
