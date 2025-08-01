<?php

namespace App\Models;

use App\Models\Admin\Settings;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class NotificationLog extends Model
{
     use Filterable;

    protected $fillable = [];



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
        return $this->belongsTo(Settings::class,'gateway_id','id');
    }

}
