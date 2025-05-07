<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class CompanyInvoice extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'invoice_date' => 'datetime',
            'expiry_date' => 'datetime',
            'data' => 'object',
            'note' => 'object',
        ];
    }

    protected static function booted(): void
    {
        static::creating(callback: function (Model $model): void {
            $model->uid     = Str::uuid();
        });
    }

    /**
     * file
     *
     * @return MorphOne
     */
    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'fileable');
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
     * company
     *
     * @return BelongsTo
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }
    
    /**
     * shifts
     *
     * @return HasMany
     */
    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class, 'company_invoice_id', 'id');
    }

    /**
     * scopeCustomFilter
     *
     * @param Builder $query
     * 
     * @return Builder
     */
    public function scopeCustomFilter(Builder $query): Builder
    {

        $company_ids         = request()->input('company_ids');

        $filterAbleCompanies = !is_array($company_ids) 
                                        ? explode(",",$company_ids)
                                        : $company_ids;

       

        return $query->when(request()->input('company_ids') , 
        fn(Builder $q): Builder => $q->whereIn('company_id',$filterAbleCompanies ));
  
    }
}
