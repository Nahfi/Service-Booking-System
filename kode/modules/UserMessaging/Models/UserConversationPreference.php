<?php

namespace Modules\UserMessaging\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserConversationPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_conversation_id',
        'user_id',
        'is_blocked',
        'is_muted'
    ];


    /**
     * Summary of toggleBlock
     * @param int $conversationId
     * @param int $userId
     * @return self
     */
    public static function toggleBlock(int $conversationId, int $userId): self{

        $preference = self::firstOrCreate(
            ['user_conversation_id' => $conversationId, 'user_id' => $userId],
            ['is_muted' => false, 'is_blocked' => false]
        );

        $preference->is_blocked = !(bool)$preference->is_blocked;
        $preference->save();

        return $preference;
    }




    /**
     * Summary of toggleMute
     * @param int $conversationId
     * @param int $userId
     * @return self
     */
    public static function toggleMute(int $conversationId, int $userId): self{

        $preference = self::firstOrCreate(
            ['user_conversation_id' => $conversationId, 'user_id' => $userId],
                ['is_muted' => false, 'is_blocked' => false]
        );


        $preference->is_muted = !(bool)$preference->is_muted;
        $preference->save();

        return $preference;
    }


}
