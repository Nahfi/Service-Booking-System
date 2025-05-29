<?php

namespace Modules\UserMessaging\Http\Controllers\Api\V1;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
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
    public function index()
    {

        return $this->messageService->getConversationList();
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {


        $conversationId = $request->conversation_id;
        $conversation = Conversation::findOrFail($conversationId);
        if (!in_array($userId, [$conversation->user1_id, $conversation->user2_id])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message = Message::create([
            'conversation_id' => $conversationId,
            'sender_id' => $userId,
            'content' => $request->content,
            'reply_to_id' => $request->reply_to_id,
        ]);

        // Create status entries for both users
        MessageStatus::create([
            'message_id' => $message->id,
            'user_id' => $conversation->user1_id,
            'tick_status' => $conversation->user1_id == $userId ? 'sent' : 'delivered',
        ]);
        MessageStatus::create([
            'message_id' => $message->id,
            'user_id' => $conversation->user2_id,
            'tick_status' => $conversation->user2_id == $userId ? 'sent' : 'delivered',
        ]);

        return response()->json($message);
        // d
        // return $this->messageService->save();
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show(int | string $id)
    {
        return $this->messageService->getConversationMessages($id);
    }

   

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {

    }
}
