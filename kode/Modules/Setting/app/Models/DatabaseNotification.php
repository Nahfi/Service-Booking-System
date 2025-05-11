<?php

namespace Modules\Setting\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Setting\Database\Factories\DatabaseNotificationFactory;

class DatabaseNotification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): DatabaseNotificationFactory
    // {
    //     // return DatabaseNotificationFactory::new();
    // }
}
