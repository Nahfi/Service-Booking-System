<?php

namespace Modules\User\Models;

use App\Models\Scopes\UserScope;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSession extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id', 'ip_address', 'user_agent', 'device_name', 'token', 'last_active_at',
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['last_active_at' => 'datetime'];
    }


    /**
     * Summary of user
     * @return BelongsTo<User, UserSession>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    
}
