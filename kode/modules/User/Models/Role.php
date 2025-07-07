<?php

namespace Modules\User\Models;

use App\Enums\Common\Status;
use App\Models\Scopes\UserScope;
use App\Models\User;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory , Filterable;


    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);

        static::creating(callback: function (Model $model): void {
            $model->user_id = parent_user()->id;
        });

    }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['permissions' => 'object'];
    }



    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status', Status::ACTIVE);
    }



    /**
     * Summary of users
     * @return HasMany<User, Role>
     */
    public function users(): HasMany{
        return $this->hasMany(User::class, 'role_id');
    }


}
