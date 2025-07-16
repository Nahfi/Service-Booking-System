<?php

namespace Modules\Settings\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DatabaseNotification extends Model
{
    use HasFactory , Filterable;

    protected $fillable = [];


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
     * Summary of scopeUnread
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('is_read' , false);
    }



}
