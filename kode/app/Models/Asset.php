<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;
class Asset extends Model
{
    use HasFactory, Filterable;
    protected $guarded = [];


    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }


    /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }


    /**
     * Summary of assetActivities
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function assetActivities(): HasMany{
        return $this->hasMany(AssetActivity::class, 'asset_id','id')->latest();
    }



     /**
     * Summary of user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'employee_id','id');
    }



    
}
