<?php

namespace App\Models\Admin;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Models\File;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Settings extends Model
{

    use Filterable;



     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
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
     * Summary of scopeDefault
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefault(Builder $q): Builder{
        return $q->where('is_default' , true);
    }



    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status',Status::ACTIVE);
    }






}
