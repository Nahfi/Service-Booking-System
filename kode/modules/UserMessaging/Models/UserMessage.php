<?php

namespace Modules\UserMessaging\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Modules\Settings\Models\File;

class UserMessage extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Summary of conversation
     * @return BelongsTo<UserConversation, UserMessage>
     */
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(UserConversation::class ,'conversation_id');
    }


    /**
     * Summary of sender
     * @return BelongsTo<User, UserMessage>
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }


    /**
     * Summary of replyTo
     * @return BelongsTo<UserMessage, UserMessage>
     */
    public function replyTo(): BelongsTo
    {
        return $this->belongsTo(SELF::class, 'reply_to_id');
    }



    /**
     * Summary of statuses
     * @return HasMany<UserMessageStatus, UserMessage>
     */
    public function statuses(): HasMany
    {
        return $this->hasMany(UserMessageStatus::class ,'message_id');
    }


    /**
     * Summary of reactions
     * @return HasMany<UserMessageReaction, UserMessage>
     */
    public function reactions(): HasMany
    {
        return $this->hasMany(UserMessageReaction::class , 'message_id');
    }


    /**
     * Summary of file
     * @return MorphMany<File, UserMessage>
     */
    public function files(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }


    /**
     * Summary of scopeVisibleToUser
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int | string $userId
     * @return Builder
     */
    public function scopeVisibleToUser(Builder $query, int | string  $userId): Builder{

        return $query->where(function (Builder $q) use ($userId): void {
                    $q->where('sender_id', $userId)
                    ->where('deleted_by_sender', false);
                })->orWhere(function (Builder $q) use ($userId): void {
                    $q->where('sender_id', '!=', $userId)
                    ->where('deleted_by_receiver', false);
                });
    }

}
