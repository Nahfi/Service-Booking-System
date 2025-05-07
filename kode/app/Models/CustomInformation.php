<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CustomInformation extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    
    /**
     * casts
     *
     * @return array
     */
    protected function casts(): array
    {
        return ['data' => 'object'];
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
     * scopeInactive
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeInactive(Builder $q): Builder{
        return $q->where('status', Status::INACTIVE);
    }

    public function scopeDefault(Builder $q): Builder{
        return $q->where('is_default', true);
    }
}
