<?php

namespace App\Models;

use App\Models\Admin\Admin;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class AffiliateInvoice extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tax_configuration'  => 'object',
            'commission_log_ids' => 'object',
        ];
    }

    /**
     * Summary of booted
     * @return void
     */
    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid = Str::uuid();
        });
    }

    /**
     * affiliateAdmin
     *
     * @return BelongsTo
     */
    public function affiliateAdmin(): BelongsTo{
        return $this->belongsTo(Admin::class, 'affiliate_admin_id');
    }

    /**
     * getCommissionLogsAttribute
     *
     * @return Collection
     */
    public function getCommissionLogsAttribute(): Collection
    {
        return AffiliateCommissionLog::whereIn('id', $this->commission_log_ids ?? [])
                                       ->get(); 
    }
}
