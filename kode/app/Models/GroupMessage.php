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

class GroupMessage extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];



    /**
     * Summary of casts
     * @return array{seen_by: string}
     */
    protected function casts(): array
    {
        return [
            'seen_by' => 'array',
            'mentioned_users' => 'array',
        ];
    }

    


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


    /**
     * Summary of GroupMessageUsers
     * @return HasMany<GroupMessageUser, GroupMessage>
     */
    public function GroupMessageUsers(): HasMany
    {
        return $this->hasMany(GroupMessageUser::class, 'user_id');
    }



    /**
     * Summary of GroupMessageMentions
     * @return HasMany<GroupMessageMention, GroupMessage>
     */
    public function GroupMessageMentions(): HasMany
    {
        return $this->hasMany(GroupMessageMention::class, 'message_id');
    }



    /**
     * Summary of file
     * @return MorphMany<File, GroupMessage>
     */
    public function file(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }

}
