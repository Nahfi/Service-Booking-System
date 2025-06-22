<?php

namespace Modules\UserMessaging\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserConversation extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Summary of messages
     * @return HasMany<UserMessage, UserConversation>
     */
    public function messages(): HasMany{
        return $this->hasMany(UserMessage::class,'conversation_id');
    }


    /**
     * Summary of users
     * @return BelongsToMany<User, UserConversation>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_conversations', 'id', 'user_one_id')
                    ->orWhere('user_two_id', $this->id);
    }


    /**
     * Summary of latestMessage
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<UserMessage, UserConversation>
     */
    public function latestMessage(): HasOne
    {
        return $this->hasOne(UserMessage::class,'conversation_id')->latestOfMany();
    }





 /**
     * Find or create a conversation by ID or between two users.
     *
     * @param int|null $conversationId
     * @param int $userA
     * @param int $userB
     * @return static
     *
     * @throws ModelNotFoundException
     */
    public static function findOrCreateWithOptionalId(?int $conversationId, int $userA, int $userB): self
    {
        return self::when($conversationId, function ($query) use ($conversationId, $userA, $userB) :UserConversation{
            return $query->where('id', $conversationId)
                ->where(function (Builder $query) use ($userA, $userB): void {
                    $query->where(function (Builder $q) use ($userA, $userB): void {
                        $q->where('user_one_id', $userA)
                        ->where('user_two_id', $userB);
                    })->orWhere(function (Builder $q) use ($userA, $userB): void {
                        $q->where('user_one_id', $userB)
                        ->where('user_two_id', $userA);
                    });
                })->firstOrFail();
        }, function () use ($userA, $userB): UserConversation{
            return self::where(function (Builder $query) use ($userA, $userB): void {
                $query->where(function (Builder $q) use ($userA, $userB): void {
                    $q->where('user_one_id', $userA)
                    ->where('user_two_id', $userB);
                })->orWhere(function (Builder $q) use ($userA, $userB): void {
                    $q->where('user_one_id', $userB)
                    ->where('user_two_id', $userA);
                });
            })->first() ?? self::create([
                'user_one_id' => $userA,
                'user_two_id' => $userB,
            ]);
        });
    }




    

}
