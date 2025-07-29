<?php

namespace App\Models\Admin;

use App\Models\File;
use App\Models\User\Booking;
use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Service extends Model
{

    use Filterable;

    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'name',  'description', 'price', 'status'
    ];


    /**
     * Summary of bookings
     * @return HasMany<Booking, Service>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class,"service_id",'id');
    }



    /**
     * Summary of file
     * @return MorphOne<File, Service>
     */
    public function file(): MorphOne{
        return $this->morphOne(File::class, 'fileable');
    }
}
