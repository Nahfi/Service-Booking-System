<?php

namespace App\Models\User;

use Illuminate\Support\Str;
use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use App\Traits\Common\Notify;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\Settings\Models\File;

use Modules\User\Models\VerificationCode;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, Filterable, SoftDeletes , Notify;

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
        'remember_token'
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
     * Summary of file
     * @return MorphOne<File, User>
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
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



}
