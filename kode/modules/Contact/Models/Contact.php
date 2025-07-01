<?php

namespace Modules\Contact\Models;

use Illuminate\Support\Str;
use App\Models\Scopes\UserScope;
use App\Models\User;
use App\Traits\Common\Filterable;
use Modules\Settings\Models\File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contact extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    //Model Configuration
    protected $guarded = [];

    protected $casts = ['custom_attributes' => 'array'];

    protected static function booted(): void
    {
        static::addGlobalScope(new UserScope);
        static::creating(callback: function (Model $model): void {

            $parentUser = parent_user();
            $model->uid = Str::uuid();
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
     * contactGroups
     *
     * @return BelongsToMany
     */
    public function contactGroups(): BelongsToMany{
        
        return $this->belongsToMany(ContactGroup::class, 'contact_group_contacts', 'contact_id', 'contact_group_id');
    }
}
