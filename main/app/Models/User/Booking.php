<?php

namespace App\Models\User;

use App\Traits\Common\Filterable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{

    use Filterable;
    protected $fillable = [
        'user_id', 'service_id', 'booking_date', 'status', 'notes', 'booking_number','service'
    ];

    protected static function booted(): void
    {
        static::creating(function ($booking) {
            if (now()->greaterThan($booking->booking_date)) {
                throw new \Exception("Cannot book a service in the past.");
            }
            $booking->booking_number = 'BOOK-' . strtoupper(Str::random(8));
        });
    }

}
