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
            $model->uid = Str::uuid();
        });
    }


    //Model Relations


    /**
     * Summary of user
     * @return BelongsTo<User, Contact>
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }


    /**
     * Summary of file
     * @return MorphOne<File, Contact>
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }

    /**
     * Summary of contactGroups
     * @return BelongsToMany<ContactGroup, Contact>
     */
    public function contactGroups(): BelongsToMany{

        return $this->belongsToMany(ContactGroup::class, 'contact_group_contacts', 'contact_id', 'contact_group_id');
    }
}
