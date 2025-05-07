<?php

namespace App\Models;

use App\Enums\Common\Status;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocumentTemplate extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

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
     * documentAssignments
     *
     * @return HasMany
     */
    public function documentAssignments(): HasMany{
        return $this->hasMany(BusinessDocumentTemplate::class, "document_template_id", "id");
    }

    /**
     * scopeSystem
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeSystem(Builder $query): Builder{
        return $query->whereNull('bo_id');
    }
}
