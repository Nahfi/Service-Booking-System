<?php

namespace App\Models\Admin;

use App\Enums\Common\Status;
use App\Models\File;
use App\Models\VerificationCode;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{

     use HasFactory, Notifiable, HasApiTokens, Filterable ;

    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'uid', 'name', 'username', 'phone', 'email', 'last_login_time',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function hidden(): array
    {
        return [
            'password',
            'remember_token'
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
     * @return MorphOne<File, Admin>
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
