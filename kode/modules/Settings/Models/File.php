<?php

namespace Modules\Settings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class File extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Summary of fileable
     * @return MorphTo<Model, File>
     */
    public function fileable(): MorphTo{
        return $this->morphTo();
    }
}

