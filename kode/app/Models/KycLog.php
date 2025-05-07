<?php

namespace App\Models;

use Illuminate\Support\Str;
use App\Enums\Common\KYCStatus;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class KycLog extends Model
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
            'kyc_data' => 'object',
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
     * scopeHold
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeHold(Builder $q): Builder
    {
        return $q->where('status', KYCStatus::HOLD);
    }

    /**
     * scopeRejected
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRejected(Builder $q): Builder
    {
        return $q->where('status', KYCStatus::REJECTED);
    }

    /**
     * scopeApproved
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeApproved(Builder $q): Builder
    {
        return $q->where('status', KYCStatus::APPROVED);
    }

    /**
     * scopeRequested
     *
     * @param Builder $q
     * 
     * @return Builder
     */
    public function scopeRequested(Builder $q): Builder
    {
        return $q->where('status', KYCStatus::REQUESTED);
    }

    /**
     * business
     *
     * @return BelongsTo
     */
    public function business(): BelongsTo
    {
        return $this->belongsTo(User::class, 'bo_id', 'id');
    }

    /**
     * user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * file
     *
     * @return MorphMany
     */
    public function file(): MorphMany{
        return $this->morphMany(File::class, 'fileable');
    }
}
