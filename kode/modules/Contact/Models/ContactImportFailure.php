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
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Settings\Models\File;

class ContactImportFailure extends Model
{
use HasFactory, Filterable;

    //Model Configuration
    protected $guarded = [];

    protected $casts = ['row_data' => 'array'];


    //Model Relations

    /**
     * contactImport
     *
     * @return BelongsTo
     */
    public function contactImport(): BelongsTo{
        return $this->belongsTo(ContactImport::class);
    }
}
