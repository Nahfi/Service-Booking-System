<?php

namespace Modules\Contact\Models;

use Illuminate\Support\Str;
use App\Traits\Common\Loadable;
use App\Traits\Common\Queryable;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Modules\Settings\Models\File;

class Contact extends Model
{
    use HasFactory, Filterable, Loadable, Queryable, SoftDeletes;

    //Model Configuration
    protected $guarded = [];

    protected $casts = ['custom_attributes' => 'array'];

    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }


    //Model Relations
    
    /**
     * file
     *
     * @return MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }

    /**
     * group
     *
     * @return BelongsTo
     */
    public function group(): BelongsTo{
        return $this->belongsTo(ContactGroup::class, 'contact_group_id', 'id');
    }
}
