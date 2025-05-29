<?php

namespace Modules\UserMessaging\Http\Services;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\UserMessaging\Models\UserConversation;

class MessageService 
{



    public function getConversationList():JsonResponse{


      $user = getAuthUser();

      $userId = $user->id;

      $conversations = UserConversation::where('user_one_id', $userId)
                            ->orWhere('user_two_id', $userId)
                            ->with(['latestMessage', 'users'])
                            // ->orderByRaw('
                            //     (SELECT MAX(created_at) FROM user_messages 
                            //     WHERE user_messages.conversation_id = conversations.id 
                            //     AND EXISTS (
                            //         SELECT 1 FROM user_message_statuses 
                            //         WHERE user_message_statuses.message_id = messages.id 
                            //         AND user_message_statuses.user_id = ? 
                            //         AND user_message_statuses.is_read = FALSE
                            //     )
                            //     ) DESC,
                            //     (SELECT MAX(created_at) FROM user_messages 
                            //     WHERE user_messages.conversation_id = user_conversations.id) DESC
                            // ', [$userId])
                            ->paginate(paginateNumber());

                            @dd(   $conversations);


        // $conversations->getCollection()->transform(function ($conversation) use ($userId) {
        //     $otherUser = $conversation->users->where('id', '!=', $userId)->first();
        //     $unreadCount = MessageStatus::where('user_id', $userId)
        //         ->whereIn('message_id', $conversation->messages->pluck('id'))
        //         ->where('is_read', false)
        //         ->count();
          

        //     return [
        //         'id' => $conversation->id,
        //         'other_user' => [
        //             'id' => $otherUser->id,
        //             'name' => $otherUser->name,
        //             'status' => UserStatus::where('user_id', $otherUser->id)->first(),
        //         ],
        //         'latest_message' => $conversation->latestMessage,
        //         'unread_count' => $unreadCount,
        //         'is_favorite' => $isFavorite,
        //     ];
        // });
                            

    }

   
   
}
