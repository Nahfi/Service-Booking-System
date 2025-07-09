<?php

namespace Modules\Contact\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactGroupContact extends Model
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
     * contact
     *
     * @return BelongsTo
     */
    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

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
