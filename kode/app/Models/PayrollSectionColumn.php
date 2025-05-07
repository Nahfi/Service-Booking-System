<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PayrollSectionColumn extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    protected $guarded = [];

    /**
     * sections
     *
     * @return HasMany
     */
    public function sections(): HasMany
    {
        return $this->hasMany(PayrollSection::class, 'payroll_section_column_id');
    }
}
