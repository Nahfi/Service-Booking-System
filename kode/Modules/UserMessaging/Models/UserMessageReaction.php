<?php

namespace Modules\UserMessaging\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserMessageReaction extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Summary of user
     * @return BelongsTo<User, UserMessageReaction>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }




   
}
