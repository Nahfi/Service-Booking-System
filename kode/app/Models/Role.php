<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Models\Admin\Admin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    
    use HasFactory, Notifiable, Filterable;



    
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
     * scopeActive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status', Status::ACTIVE);
    }



    

    /**
     * Summary of users
     * @return HasMany<Admin, Role>
     */
    public function users(): HasMany
    {
        return $this->hasMany(Admin::class, 'role_id', 'id');
    }





}
