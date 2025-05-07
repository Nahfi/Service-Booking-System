<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class NotificationLog extends Model
{

    use HasFactory ,Filterable;
    protected $guarded = [];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'custom_data'      => 'object',
            'gateway_response' => 'object',
        ];
    }


    
    /**
     * Summary of receiver
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function receiver(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'receiver_model', 'receiver_id');
    }



    /**
     * Summary of gateway
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gateway(): BelongsTo{
        return $this->belongsTo(Setting::class,'gateway_id','id');
    }


     /**
     * Summary of scopeSystem
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSystem(Builder $q): Builder{
        return $q->whereNull('sender_model')
                             ->whereNull('sender_id');
    }





    
}
