<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationTemplate extends Model
{
    use HasFactory ;
    protected $guarded = [];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'template_key' => 'object',
            'editor_files' => 'array'
        ];
    }




    /**
     * Summary of scopeSystem
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSystem(Builder $q): Builder{
        return $q->whereNull('bo_id');
    }

    public function scopeOutgoing(Builder $q): Builder{
        return $q->where('type' ,'outgoing');
    }



    



    



}
