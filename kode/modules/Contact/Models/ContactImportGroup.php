<?php

namespace Modules\Contact\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactImportGroup extends Model
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
     * The contact import that this group association belongs to.
     *
     * @return BelongsTo
     */
    public function contactImport(): BelongsTo
    {
        return $this->belongsTo(ContactImport::class, 'contact_import_id');
    }

    /**
     * The contact group associated with the import.
     *
     * @return BelongsTo
     */
    public function contactGroup(): BelongsTo
    {
        return $this->belongsTo(ContactGroup::class, 'contact_group_id');
    }
}
