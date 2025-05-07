<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class File extends Model
{

    use HasFactory;


    protected $guarded = [];

    protected static function booted(){
        static::addGlobalScope('autoload', function (Builder $builder) {
            $builder->with(['folder']);
        });
    }


    /**
     * Summary of folder
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function folder(): BelongsTo{
        return $this->belongsTo(Folder::class,'folder_id','id');
    }



    /**
     * Summary of fileable
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function fileable(): MorphTo{
        return $this->morphTo();
    }

     

}
