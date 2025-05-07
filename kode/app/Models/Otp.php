<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Otp extends Model
{
    use HasFactory;

    protected $guarded = [];



    /**
     * Summary of otpable
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function otpable(): MorphTo{
        return $this->morphTo();
    }
}
