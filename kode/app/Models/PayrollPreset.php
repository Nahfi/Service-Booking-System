<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PayrollPreset extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * allowances
     *
     * @return HasMany
     */
    public function allowances(): HasMany
    {
        return $this->hasMany(PayrollAllowance::class, 'preset_id', 'id');
    }

    /**
     * deductions
     *
     * @return HasMany
     */
    public function deductions(): HasMany
    {
        return $this->hasMany(PayrollDeduction::class, 'preset_id', 'id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'preset_id', 'id');
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

    /**
     * scopeDefault
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeDefault(Builder $q): Builder{
        return $q->where('is_default', true);
    }
}
