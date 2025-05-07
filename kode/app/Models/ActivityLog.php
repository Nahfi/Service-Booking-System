<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ActivityLog extends Model
{

    use HasFactory , Filterable;
    protected $guarded = [];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return ['payload' => 'object'];
    }



     /**
      * Summary of causer
      * @return \Illuminate\Database\Eloquent\Relations\MorphTo
      */
     public function causer(): MorphTo
     {
         return $this->morphTo(__FUNCTION__, 'causer_model', 'causer_id');
     }


    /**
     * Summary of scopeSystem
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSystem(Builder $q): Builder{
        return $q->whereNull('viewer_model')
                             ->whereNull('viewer_model_id');
    }
}
