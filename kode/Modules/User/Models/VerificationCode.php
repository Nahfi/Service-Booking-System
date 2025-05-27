<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class VerificationCode extends Model
{
    use HasFactory;
    protected $fillable = [];

    
    /**
     * Summary of otpable
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function otpable(): MorphTo{
        return $this->morphTo();
    }



}
