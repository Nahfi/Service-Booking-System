<?php

namespace App\Models;

use App\Enums\Common\DocumentStatus;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class BusinessDocumentTemplate extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * scopePending
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopePending(Builder $q): Builder{
        return $q->where('status', DocumentStatus::PENDING);
    }
    
    /**
     * scopeRequested
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRequested(Builder $q): Builder{
        return $q->where('status', DocumentStatus::REQUESTED);
    }

    /**
     * scopeAccepted
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeAccepted(Builder $q): Builder{
        return $q->where('status', DocumentStatus::ACCEPTED);
    }

    /**
     * scopeRejected
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRejected(Builder $q): Builder{
        return $q->where('status', DocumentStatus::REJECTED);
    }

    /**
     * template
     *
     * @return BelongsTo
     */
    public function template(): BelongsTo{
        return $this->belongsTo(DocumentTemplate::class, "document_template_id", "id");
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, "user_id", "id");
    }

    /**
     * logs
     *
     * @return HasMany
     */
    public function logs(): HasMany{
        return $this->hasMany(DocumentLog::class, 'assignment_id', 'id')->latest();
    }

    /**
     * file
     *
     * @return MorphMany
     */
    public function file(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }
}
