<?php

namespace Modules\UserMessaging\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserConversation extends Model
{
    use HasFactory;

    protected $fillable = [];


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


    

}
