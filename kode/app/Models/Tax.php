<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tax extends Model
{
    use HasFactory, Filterable;

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
        return [
            'applies_on' => 'object',
        ];
    }

    /**
     * Summary of scopeActive
     * @param Builder $query
     * @return Builder
     */
    public function scopeActive(Builder $query): Builder
    {

        return $query->where('status', Status::ACTIVE);
    }

    /**
     * scopeSystem
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeSystem(Builder $query): Builder
    {
        return $query->whereNull('bo_id');
    }

    /**
     * business
     *
     * @return BelongsTo
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bo_id', 'id');
    }
}
