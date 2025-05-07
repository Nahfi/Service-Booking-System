<?php

namespace App\Models;

use App\Models\Admin\Admin;
use App\Traits\Common\Filterable;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatabaseNotification extends Model
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
     * Summary of scopeSystem
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSystem(Builder $q): Builder{
        return $q->where('receiver_model',get_class(new Admin()))
                             ->where('reciever_id', get_superadmin()->id);
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
