<?php

namespace Modules\Contact\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactGroupDeletion extends Model
{
    use HasFactory, Filterable;

    ## =================== ##
    ## Model Configuration ##
    ## =================== ##

    protected $guarded = [];

    
    ## =============== ##
    ## Model Relations ##
    ## =============== ##

    /**
     * contactGroup
     *
     * @return BelongsTo
     */
    public function contactGroup(): BelongsTo
    {
        return $this->belongsTo(ContactGroup::class, 'contact_group_id');
    }
}
