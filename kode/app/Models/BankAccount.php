<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BankAccount extends Model
{
    use HasFactory, Filterable;
    protected $guarded = [];





    /**
     * Summary of currency
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currency(): BelongsTo{
        return $this->belongsTo(Setting::class,'currency_id','id');
    }



    /**
     * Summary of transactions
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions(): HasMany{
        return $this->hasMany(BankAccountTransaction::class,'account_id','id');
    }



}
