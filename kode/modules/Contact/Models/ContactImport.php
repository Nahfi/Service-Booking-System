<?php

namespace Modules\Contact\Models;

use App\Models\Scopes\UserScope;
use App\Models\User;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Modules\Settings\Models\File;

class ContactImport extends Model
{
use HasFactory, Filterable;

    //Model Configuration
    protected $guarded = [];

    protected $casts = [
        'meta_data' => 'array',
        'column_map' => 'array'
    ];

    /**
     * booted
     *
     * @return void
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);
        static::creating(callback: function (Model $model): void {

            $parentUser = parent_user();
            if($parentUser) $model->user_id = parent_user()->id;
        });
    }


    //Model Relations

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
    
    /**
     * file
     *
     * @return MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }

    /**
     * The contact groups associated with the import.
     *
     * @return BelongsToMany
     */
    public function contactGroups(): BelongsToMany
    {
        return $this->belongsToMany(ContactGroup::class, 'contact_import_groups', 'contact_import_id', 'contact_group_id');
    }

    /**
     * failures
     *
     * @return HasMany
     */
    public function failures(): HasMany
    {
        return $this->hasMany(ContactImportFailure::class, 'contact_import_id');
    }
   
}
