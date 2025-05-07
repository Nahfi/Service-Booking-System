<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory , Filterable;
    protected $guarded = [];




     /*
    * Summary of currency
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
    public function currency(): BelongsTo{
        return $this->belongsTo(Setting::class,'currency_id','id');
     }
 
 
     /**
      * Summary of account
      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
      */
     public function account(): BelongsTo{
         return $this->belongsTo(BankAccount::class,'account_id','id');
     }
 
 
     /**
      * Summary of location
      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
      */
     public function location(): BelongsTo{
         return $this->belongsTo(BusinessLocation::class,'location_id','id');
     }


      /**
      * Summary of location
      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
      */
      public function category(): BelongsTo{
        return $this->belongsTo(ExpenseCategory::class,'category_id','id');
    }
}
