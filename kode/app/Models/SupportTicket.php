<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SupportTicket extends Model
{
    use HasFactory, Filterable;

    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['ticket_data' => 'object'];
    }

    /**
     * Summary of scopeSystem
     * @param Builder $query
     * @return Builder
     */
    public function scopeSystem(Builder $query): Builder{
        return $query->whereNull('receiver_id');
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void{
        static::creating(callback: function (Model $model): void {
            $model->uid            = Str::uuid();
            $model->ticket_number  = generateTicketNumber();
        });

    }

    /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function file(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }

    /**
     * Summary of files
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function files(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }

    /**
     * Summary of messages
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages(): HasMany{
        return $this->hasMany(SupportTicketMessage::class, 'support_ticket_id');
    }



   /**
     * Summary of receiver
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function causer(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'causer_model', 'causer_id');
    }

}
