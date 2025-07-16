<?php

namespace Modules\Settings\Models;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Models\Scopes\UserScope;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Settings extends Model
{
    use HasFactory ,Filterable;



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
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'key',
        'group',
        'sub_group',
        'value',
        'status',
        'is_default'
    ];


    /**
     * Summary of file
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }



    /**
     * Summary of scopeDefaultgGroup
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefaultgGroup(Builder $q): Builder{
        return $q->where('group' , SettingKey::DEFAULT->value);
    }



    /**
     * Summary of scopeLanguage
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLanguage(Builder $q): Builder{
        return $q->where('group',SettingKey::LANGUAGES->value);
    }



    /**
     * Summary of scopeSmsGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSmsGateway(Builder $q) : Builder{
        return $q->where('group',SettingKey::NOTIFICATION_GATEWAY->value)
                         ->where('sub_group',SettingKey::SMS_GATEWAY->value);
    }



    /**
     * Summary of scopeMailGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMailGateway(Builder $q) : Builder {
        return $q->where('group',SettingKey::NOTIFICATION_GATEWAY->value)
                         ->where('sub_group',SettingKey::MAIL_GATEWAY->value);
    }



    /**
     * Summary of scopeMailGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNotificationGateway(Builder $q) : Builder {
        return $q->where('group',SettingKey::NOTIFICATION_GATEWAY->value);
    }


    /**
     * Summary of scopeFirebaseGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFirebaseGateway(Builder $q) : Builder{
        return $q->where('group',SettingKey::NOTIFICATION_GATEWAY->value)
                         ->where('sub_group',SettingKey::FIREBASE_GATEWAY->value);
    }




    /**
     * Summary of scopeDefault
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefault(Builder $q): Builder{
        return $q->where('is_default' , true);
    }


    /**
     * scopeActive
     *
     * @param Builder $q
     *
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status',Status::ACTIVE);
    }






}
