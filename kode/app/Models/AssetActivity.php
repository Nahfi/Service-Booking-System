<?php

namespace App\Models;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssetActivity extends Model
{
    use HasFactory, Filterable;
    protected $guarded = [];



    /**
     * Summary of user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo{
        return $this->belongsTo(User::class, 'employee_id','id');
    }

}
