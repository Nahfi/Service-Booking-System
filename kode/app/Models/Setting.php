<?php

namespace App\Models;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Setting extends Model
{

    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'bo_id',
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
     * Summary of parent
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent() : BelongsTo{
        return $this->belongsTo(SELF::class,'parent_id');
    }


    
    /**
     * Summary of scopeSystem
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSystem(Builder $q): Builder{
        return $q->whereNull('bo_id');
    }



    /**
     * Summary of scopeDefault
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefault(Builder $q): Builder{
        return $q->where('group' , SettingKey::DEFAULT->value);
    }



    /**
     * Summary of scopeCurrency
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrency(Builder $q): Builder{
        return $q->where('group',SettingKey::CURRENCIES->value);
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
     * Summary of scopePaymentGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePaymentGateway(Builder $q) : Builder{
        return $q->where('group',SettingKey::PAYMENT_GATEWAY->value);
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
     * Summary of scopeFirebaseGateway
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFirebaseGateway(Builder $q) : Builder{
        return $q->where('group',SettingKey::NOTIFICATION_GATEWAY->value)
                         ->where('sub_group',SettingKey::FIREBASE_GATEWAY->value);
    }




    /**
     * Summary of scopeDefaultKey
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDefaultKey(Builder $q): Builder{
        return $q->where('is_default' , true);
    }



    /**
     * Summary of businessCurrencies
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function businessCurrencies(): HasMany{
        return $this->hasMany(UserBusinessSetting::class, 'currency_id', 'id');
    }


    /**
     * Summary of businessLanguages
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function businessLanguages(): HasMany{
        return $this->hasMany(UserBusinessSetting::class, 'language_id', 'id');
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
