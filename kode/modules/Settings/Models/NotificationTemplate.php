<?php

namespace Modules\Settings\Models;

use App\Models\Scopes\UserScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NotificationTemplate extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {

        static::addGlobalScope(new UserScope);
        static::creating(callback: function (Model $model): void {
            $parentUser = parent_user();
            if($parentUser){
                $model->user_id = parent_user()->id;
            }
        });
    }


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'template_key' => 'object',
            'editor_files' => 'array'
        ];
    }

}
