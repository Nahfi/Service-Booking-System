<?php

namespace Modules\Contact\Models;

use App\Models\Scopes\UserScope;
use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactGroup extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    ## =================== ##
    ## Model Configuration ##
    ## =================== ##

    protected $guarded = [];

    protected $casts = ['attribute_configurations' => 'array'];

    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);
        static::creating(callback: function (Model $model): void {

            $parentUser = parent_user();
            $model->uid = Str::uuid();
            if($parentUser) $model->user_id = parent_user()->id;
        });
    }

    ## =============== ##
    ## Model Relations ##
    ## =============== ##

    /**
     * contacts
     *
     * @return BelongsToMany
     */
    public function contacts(): BelongsToMany
    {
        return $this->belongsToMany(Contact::class, 'contact_group_contacts', 'contact_group_id', 'contact_id');
    }

    /**
     * contactImports
     *
     * @return BelongsToMany
     */
    public function contactImports(): BelongsToMany
    {
        return $this->belongsToMany(ContactImport::class, 'contact_import_groups', 'contact_group_id', 'contact_import_id');
    }
}
