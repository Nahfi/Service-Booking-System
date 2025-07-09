<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Models\Scopes\UserScope;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\Settings\Models\File;
use Modules\Settings\Models\Settings;
use Modules\User\Models\Role;
use Modules\User\Models\UserSession;
use Modules\User\Models\VerificationCode;
use Modules\UserMessaging\Models\UserConversation;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Filterable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password'          => 'hashed',
            'address'           => 'object',
            'recovery_codes'    => 'object',
            'meta_data'         => 'object',
            'last_login_time'   => 'datetime',
            'email_verified_at' => 'datetime'

        ];
    }


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function hidden(): array
    {
        return [
            'password'
        ];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {

        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }


    /**
     * Summary of conversationAsUserOne
     * @return HasOne<UserConversation, User>
     */
    public function conversationAsUserOne(): HasOne{
        return $this->hasOne(UserConversation::class, 'user_one_id');
    }


    /**
     * Summary of conversationAsUserTwo
     * @return HasOne<UserConversation, User>
     */
    public function conversationAsUserTwo(): HasOne{
        return $this->hasOne(UserConversation::class, 'user_two_id');
    }




    /**
     * Summary of getConversationAttribute
     * @return HasOne<UserConversation, User>
     */
    public function getConversationAttribute(): UserConversation | HasOne | null
    {
        return $this->conversationAsUserOne ?? $this->conversationAsUserTwo;
    }



    /**
     * Summary of parent
     * @return BelongsTo<User, User>
     */
    public function parent():BelongsTo{
        return $this->belongsTo(SELF::class,'parent_id');
    }

    /**
     * Summary of settings
     * @return HasMany<Settings, User>
     */
    public function settings(): HasMany{
         return $this->hasMany(Settings::class,'user_id');
    }


    /**
     * Summary of file
     * @return MorphOne<File, User>
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }


    /**
     * Summary of role
     * @return BelongsTo<Role, User>
     */
    public function role(): BelongsTo{
        return $this->belongsTo(Role::class, 'role_id');

    }


    /**
     * Summary of sessions
     * @return HasMany<UserSession, User>
     */
    public function sessions(): HasMany
    {
        return $this->hasMany(UserSession::class);
    }


    /**
     * Summary of otp
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function otp(): MorphMany
    {
        return $this->MorphMany(VerificationCode::class, 'otpable');
    }




    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return  $q->where('status',Status::ACTIVE);
    }




    /**
     * Summary of scopeChild
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeChild(Builder $q): Builder{
        return  $q->whereNotNull('parent_id');
    }





    /**
     * Summary of scopeParent
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeParentUser(Builder $q): Builder{
        return  $q->whereNull('parent_id');
    }



    /**
     * Summary of isParent
     * @return bool
     */
    public function isParent(): bool{
        return is_null($this->parent_id);
    }



    /**
     * Summary of scopeExcludeSelfIfNotParent
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \App\Models\User $user
     * @return Builder
     */
    public function scopeExcludeSelfIfNotParent(Builder $query, User $user): Builder
    {
        return $user->isParent()
                    ? $query
                    : $query->where('id', '!=', $user->id);
    }





}
