<?php

namespace Modules\UserMessaging\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class UserConversation extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Summary of getUsersAttribute
     * @return Collection<TKey, mixed>
     */
    public function getUsersAttribute(): Collection{
        return collect([$this->userOne, $this->userTwo])->filter();
    }


    /**
     * Summary of messages
     * @return HasMany<UserMessage, UserConversation>
     */
    public function messages(): HasMany{
        return $this->hasMany(UserMessage::class,'conversation_id');
    }


    /**
     * Summary of userOne
     * @return BelongsTo<User, UserConversation>
     */
    public function userOne(): BelongsTo{
        return $this->belongsTo(User::class, 'user_one_id');
    }


    /**
     * Summary of userTwo
     * @return BelongsTo<User, UserConversation>
     */
    public function userTwo(): BelongsTo{
        return $this->belongsTo(User::class, 'user_two_id');
    }


    /**
     * Summary of latestMessage
     * @return BelongsTo<UserMessage, UserConversation>
     */
    public function latestMessage(): belongsTo
    {
        return $this->belongsTo(UserMessage::class,'last_message_id');
    }




    /**
     * Summary of conversationPreferences
     * @return HasMany<UserConversationPreference, UserConversation>
     */
    public function conversationPreferences(): HasMany{
        return $this->hasMany(UserConversationPreference::class,'user_conversation_id');
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



    /**
     * Summary of scopeWhereUserInvolved
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int|string $userId
     * @return Builder
     */
    public function scopeWhereUserInvolved(Builder $query, int | string $userId): Builder{
        return $query->where(function (Builder $q) use ($userId): void {
                            $q->where('user_one_id', $userId)
                            ->orWhere('user_two_id', $userId);
                        });
    }


}
