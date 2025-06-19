<?php

namespace Modules\UserMessaging\Http\Services;

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
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Modules\Settings\Models\File;
use Modules\UserMessaging\Http\Resources\UserMessageResource;
use Modules\UserMessaging\Models\UserConversation;
use Modules\UserMessaging\Models\UserMessage;
use Modules\UserMessaging\Models\UserMessageStatus;

class MessageService 
{

    use ModelAction , Fileable;

    public function getConversationList():JsonResponse{


      $user = getAuthUser();

      $userId = $user->id;

    //   $conversations = UserConversation::where('user_one_id', $userId)
    //                         ->orWhere('user_two_id', $userId)
    //                         ->with(['latestMessage', 'users'])
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
                            // ->paginate(paginateNumber());

                            @dd(   'sadx');


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





    /**
     * Summary of getConversationMessages
     * @param int|string $conversationId
     * @param int|string $userId
     * @return JsonResponse
     */
    public function getConversationMessages(int | string $conversationId , int | string $userId): JsonResponse{
        
        $user = getAuthUser();

        $conversation = UserConversation::findOrCreateWithOptionalId($conversationId, $user->id, $userId);

        $messages = UserMessage::with(['files','reactions.user.file','sender','replyTo'])
                               ->where('conversation_id',$conversation->id)
                               ->paginate(paginateNumber())
                                                  ->appends(request()->all());
                                                  

        return ApiResponse::asSuccess()
                ->withData(resource: $messages,resourceNamespace: UserMessageResource::class)
                ->build();


    }



    /**
     * Summary of save
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse|mixed
     */
    public function save(Request $request): JsonResponse{


        $user             = getAuthUser();
        $parentUserId     = $user->parent_id ?? $user->id;
        $senderId         =  $user->id;

        $receiverId       = $request->input('receiver_id');
        $conversationId   = $request->input('conversation_id');
        $content          = $request->input('content');
        $files            = $request->input('files');

        $replyToId = $request->input('reply_to_id');

        if($receiverId){

            if($senderId == $receiverId)
                   throw new Exception(translate("Sender and receiver can not be the same person"), Response::HTTP_FORBIDDEN);

            $receiverUser     = User::where('id', $receiverId)->firstOrfail();

            $isNotChildOfParent = $receiverUser->parent_id && $receiverUser->parent_id != $parentUserId;

            $isNotParentUser    = !$receiverUser->parent_id && $receiverUser->id != $parentUserId;

            if (($isNotChildOfParent || $isNotParentUser)) {
                throw new Exception(translate("Invalid receiver user"), Response::HTTP_FORBIDDEN);
            }

        }

        $conversation = UserConversation::findOrCreateWithOptionalId($conversationId, $senderId, $receiverId);


        $message =  DB::transaction(function() use($replyToId , $conversation ,  $user , $content ,  $files): UserMessage{

                        if($replyToId){
                            $replyMessage = UserMessage::where('conversation_id', $conversation->id)
                                                                ->where('id',$replyToId)
                                                                ->firstOrFail();
                        }


                        $message = UserMessage::create([
                                                                        'conversation_id' => $conversation->id,
                                                                        'sender_id'       => $user->id,
                                                                        'content'         => $content,
                                                                        'reply_to_id'     => $replyToId,
                                                                    ]);
                        if($files && is_array( $files)){

                            $responses =  [];

                            collect( $files)->each(function(mixed $file) use(&$responses){

                                if($file && is_file($file)){
                                    $responses[] =  $this->storeFile( file: $file, 
                                                                        location : GlobalConfig::FILE_PATH['messages']['user']['path']
                                                                    );
                                }

                            });

                            if (!empty($responses))   $this->saveFiles($message , $responses , FileKey::MESSAGE_FILE->value);

                        }

                        
                        return $message->load(['files','sender','replyTo']);

                    });



        return ApiResponse::asSuccess()
                    ->withData(resource: $message,resourceNamespace: UserMessageResource::class)
                    ->build();

    }



    /**
     * Summary of update
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse{

        $user    = getAuthUser();
        $message = UserMessage::where('id',$request->input('id'))
                                    ->where('sender_id', $user->id)
                                    ->firstOrfail();


        $message->content = $request->input('content');
        $message->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $message,resourceNamespace: UserMessageResource::class)
                                ->build();
    }




    /**
     * Summary of destroy
     * @param int|string $id
     * @return JsonResponse
     */
    public function destroy(int | string $id): JsonResponse{

        $user    = getAuthUser();
        $message = UserMessage::with(['files','reactions'])->where('id',$id)
                                    ->where('sender_id', $user->id)
                                    ->firstOrfail();

        if($message->files->count() > 0){
            $message->files->each(function(File $file): void{
                $this->unlink(GlobalConfig::FILE_PATH['messages']['user']['path'] , $file);
            });
        }

        if($message->reactions->count() > 0) $message->reactions()->delete();

        $message->delete();

        return ApiResponse::asSuccess()
                              ->build();     
    }

}
