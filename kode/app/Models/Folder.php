<?php

namespace App\Models;

use App\Traits\Common\Fileable;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Folder extends Model
{

    use HasFactory , Filterable;
    protected $guarded = [];



    /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }


    /**
     * Summary of files
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function files(): HasMany{
        return $this->hasMany(File::class,'folder_id')->latest();
    }


    /**
     * Summary of parent
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent(): BelongsTo{
        return $this->belongsTo(SELF::class,'parent_id');
    }
    


    /**
     * Summary of childs
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function childs(): HasMany{
        return $this->hasMany(SELF::class,'parent_id')->latest();
    }


    /**
     * Summary of scopeAdmin
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAdmin(Builder $q): Builder{
        return $q->where('global_accessibility', true);
    }





}
