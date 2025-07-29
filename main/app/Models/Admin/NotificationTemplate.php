<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class NotificationTemplate extends Model
{


    /**
     * Summary of guarded
     * @var array
     */
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

}
