<?php

namespace Modules\UserMessaging\Http\Services;

use App\Enums\Settings\ErrorEventKey;
use App\Enums\Settings\FileKey;
use App\Enums\Settings\GlobalConfig;
use App\Facades\ApiResponse;
use App\Models\User;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Modules\Settings\Models\File;
use Modules\User\Http\Services\AuthService;
use Modules\UserMessaging\Http\Resources\UserConversationResource;
use Modules\UserMessaging\Http\Resources\UserMessageResource;
use Modules\UserMessaging\Models\UserConversation;
use Modules\UserMessaging\Models\UserConversationPreference;
use Modules\UserMessaging\Models\UserMessage;
use Modules\UserMessaging\Models\UserMessageReaction;

class MessageService
{

    use ModelAction , Fileable;


    /**
     * Summary of getConversationList
     * @return JsonResponse
     */
    public function getConversationList(): JsonResponse{

        $authUser      = getAuthUser();


        $conversations = UserConversation::with([
                                    'latestMessage' => fn(BelongsTo $q):BelongsTo => $q->visibleToUser($authUser->id),
                                    'userOne.file',
                                    'userTwo.file',
                                    'conversationPreferences' => fn(HasMany $q) : HasMany =>
                                         $q->where('user_id' ,$authUser->id)
                                    ])
                                ->whereUserInvolved($authUser->id)
                                ->orderByDesc('last_message_at')
                                ->paginate(paginateNumber())
                                ->appends(request()->all());


        return ApiResponse::asSuccess()
                            ->withData(resource: $conversations,resourceNamespace: UserConversationResource::class)
                            ->build();

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

        $conversation->loadMissing(['conversationPreferences','userOne.file', 'userTwo.file']);

        $conversationResource = new UserConversationResource($conversation);


        if(self::isBlockedBy($user , $conversation->conversationPreferences)){


            return ApiResponse::error(
                                        data: ['error' => translate('Conversation is blocked')],
                                        code: Response::HTTP_FORBIDDEN,
                                        appends: [
                                                   'event'        => ErrorEventKey::USER_BLOCKED->value,
                                                   'conversation' => $conversationResource
                                                 ]
                                    );

        }


        $messages = UserMessage::with(['files','reactions.user.file','sender','replyTo'])
                               ->where('conversation_id',$conversation->id)
                                        ->where(function (Builder $query) use ($user): void{
                                            $query->visibleToUser($user->id);
                                        })->paginate(paginateNumber())
                                          ->appends(request()->all());



        $idsToMarkRead = $messages
                                ->getCollection()
                                ->where('sender_id', '!=', $user->id)
                                ->where('is_read', false)
                                ->pluck('id');


        if(!$idsToMarkRead->isEmpty()){

            UserMessage::whereIn('id', $idsToMarkRead)
                          ->update(['is_read' => true]);

        }



        return ApiResponse::asSuccess()
                ->withData(resource: $messages,resourceNamespace: UserMessageResource::class)
                ->append('conversation' ,  $conversationResource)
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

            $receiverUser     = User::active()
                                        ->where('id', $receiverId)
                                        ->firstOrfail();

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


                        $conversation->update([
                            'last_message_id' => $message->id,
                            'last_message_at' => Carbon::now(),
                        ]);

                        return $message->load(['files','sender','replyTo']);

                    });



        #notify receiver  if convo is new
        if($conversation->wasRecentlyCreated){

            $parentUser = !$user->parent_id
                                        ? $user
                                        : (new AuthService())->findActiveUser(['parent_id' => $user->id]);

            $receiverUser->notifyUserMessage( $user->name ,$parentUser , $conversation);

        }



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


        if($message->deleted_by_receiver){

            self::destroyMessage($message);
            return ApiResponse::asSuccess()->build();
        }

        $message->update(['deleted_by_sender' => true]);

        return ApiResponse::asSuccess()
                              ->build();
    }



    /**
     * Summary of toggleReaction
     * @param \Illuminate\Http\Request $request
     * @param int|string $conversationId
     * @param int|string $messageId
     * @return JsonResponse
     */
    public function toggleReaction(Request $request , int | string $conversationId , int | string $messageId): JsonResponse{

        $user    = getAuthUser();

        $conversation = self::getUserConversationById($conversationId);

        $message = UserMessage::where('conversation_id',$conversationId)
                        ->where('id',$messageId)
                        ->firstOrfail();


        $queryAttributes = [
                            'message_id' => $messageId,
                            'user_id'    => $user->id,
                            'reaction'   => $request->input('reaction')
                           ];

        $reaction = UserMessageReaction::where($queryAttributes)
                                        ->first();

        $reaction?->delete() ?: UserMessageReaction::create($queryAttributes);

        return ApiResponse::asSuccess()
                        ->build();

    }


    /**
     * Summary of toggleMute
     * @param int|string $id
     * @return JsonResponse
     */
    public function toggleMute(int | string $conversationId): JsonResponse{

        $user    = getAuthUser();

        $conversation = self::getUserConversationById($conversationId);

        $preference = UserConversationPreference::toggleMute($conversation->id, $user->id);

        return ApiResponse::asSuccess()
                             ->build();
    }



    /**
     * Summary of toggleBlock
     * @param int|string $conversationId
     * @return JsonResponse
     */
    public function toggleBlock(int | string $conversationId): JsonResponse{

        $user    = getAuthUser();

        $conversation = self::getUserConversationById($conversationId);

        $preference = UserConversationPreference::toggleBlock($conversation->id, $user->id);

        return ApiResponse::asSuccess()
                              ->build();
    }



    /**
     * Summary of destroyConversation
     * @param int|string $conversationId
     * @return JsonResponse
     */
    public function destroyConversation(int | string $conversationId) : JsonResponse{

        $user    = getAuthUser();

        $conversation = self::getUserConversationById($conversationId);

        UserMessage::with(['files','reactions'])
                                ->where('conversation_id',$conversation->id)
                                ->orderBy('id')
                                ->chunk(500, function (Collection $messages) use ($user) {
                                    $messages->each(function (UserMessage $message) use ($user): void {
                                        self::deleteMessageForUser($message , $user->id);
                                    });
                                });



        return ApiResponse::asSuccess()
                              ->build();
    }


    /**
     * Summary of getUserConversationById
     * @param int $conversationId
     * @return UserConversation
     */
    private static function getUserConversationById(int $conversationId): ?UserConversation{


        $user    = getAuthUser();


        return UserConversation::where('id', $conversationId)
                ->where(function (Builder $q) use ($user): void {
                    $q->where('user_one_id', $user->id)
                          ->orWhere('user_two_id', $user->id);
                })
                ->firstOrfail();

    }




    /**
     * Summary of destroyMessage
     * @param \Modules\UserMessaging\Models\UserMessage $message
     * @return bool|null
     */
    private static function destroyMessage(UserMessage $message): bool|null{

        $instance   = new self();

        if($message->files->count() > 0){
            $message->files->each(function(File $file) use($instance): void{
                $instance->unlink(GlobalConfig::FILE_PATH['messages']['user']['path'] , $file);
            });
        }

        if($message->reactions->count() > 0) $message->reactions()->delete();

        return $message->delete();

    }


    /**
     * Summary of deleteMessageForUser
     * @param \Modules\UserMessaging\Models\UserMessage $message
     * @param int $userId
     * @return void
     */
    private static function deleteMessageForUser(UserMessage $message , int $userId): void{

        $isSender = $message->sender_id == $userId;

        if (
            ($isSender && $message->deleted_by_receiver) ||
            (!$isSender && $message->deleted_by_sender)
        ) {
            self::destroyMessage($message);
            return;
        }

        $column = $isSender ? 'deleted_by_sender' : 'deleted_by_receiver';

        if (!$message->{$column}) {
            $message->{$column} = true;
            $message->save();
        }
    }


    /**
     * Summary of isBlockedBy
     * @param \App\Models\User $user
     * @param \Illuminate\Database\Eloquent\Collection $conversationPreferences
     * @return bool
     */
    private static function isBlockedBy(User $user , Collection $conversationPreferences): bool{

        return $conversationPreferences
                        ->contains(fn(UserConversationPreference $pref): bool => $pref->user_id === $user->id && $pref->is_blocked);
    }



}
