<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class VerificationCode extends Model
{


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];



    /**
     * Summary of otpable
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function otpable(): MorphTo{
        return $this->morphTo();
    }
}
