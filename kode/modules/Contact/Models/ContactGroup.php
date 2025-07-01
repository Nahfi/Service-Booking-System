<?php

namespace Modules\Contact\Models;

use Illuminate\Support\Str;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
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
}
