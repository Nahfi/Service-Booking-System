<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class BlockedGroupUser extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];


     /**
     * Summary of Group
     * @return BelongsTo<DepartmentGroup, GroupMessage>
     */
    public function Group(): BelongsTo
    {
        return $this->belongsTo(DepartmentGroup::class, 'group_id');
    }


    /**
     * Summary of User
     * @return BelongsTo<User, GroupMessage>
     */
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }




}
