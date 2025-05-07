<?php

namespace App\Models;

use App\Enums\Common\Status;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
class PricingPlan extends Model
{

    use HasFactory;


     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'uid',
        'name',
        'price_configuration',
        'features',
        'description',
        'trial_days',
        'status',
        'is_free',
        'total_location',
        'custom_features',
    ];



    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_configuration' => 'object',
            'custom_features'     => 'object',
            'features'            => 'object'
        ];
    }


     /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void{
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }

    /**
     * Summary of scopeActive
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive(Builder $q): Builder{
        return $q->where('status',Status::ACTIVE);
    }

    public function subscriptions(): HasMany {
        return $this->hasMany(Subscription::class, 'plan_id', 'id');
    }


}
