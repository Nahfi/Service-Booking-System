<?php

namespace Modules\Setting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Setting\Database\Factories\NotificationLogFactory;

class NotificationLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): NotificationLogFactory
    // {
    //     // return NotificationLogFactory::new();
    // }
}
