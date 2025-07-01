<?php

namespace Modules\Contact\Models;

use Illuminate\Support\Str;
use App\Traits\Common\Loadable;
use App\Traits\Common\Queryable;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactGroup extends Model
{
    use HasFactory, Filterable, Loadable, Queryable, SoftDeletes;

    //Model Configuration
    protected $guarded = [];

    protected $casts = ['attribute_configurations' => 'array'];

    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }

    //Model Relations

    /**
     * contacts
     *
     * @return HasMany
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'contact_group_id', 'id');
    }
}
