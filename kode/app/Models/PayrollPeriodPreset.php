<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Common\Filterable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Builder;

class PayrollPeriodPreset extends Model
{
    use HasFactory, Notifiable, HasApiTokens, Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];




    /**
     * Summary of calculateWeeks
     * @param string $start_month_day
     * @param string $end_month_day
     * @return string
     */
    public static function calculateWeeks(string $start_month_day, string $end_month_day): string
    {
        $currentYear = Carbon::now()->year;
        $start_date = Carbon::parse("$currentYear-$start_month_day");
        $end_date = Carbon::parse("$currentYear-$end_month_day");
    
        $period = CarbonPeriod::create($start_date, '1 week', $end_date);
        $weekNumbers = [];
    
        foreach ($period as $date) {
            $weekNumbers[] = ltrim($date->format('W'), '0'); 
        }
    

        $weekRanges = [];
        $startRange = null;
        $previousWeek = null;
    
        foreach ($weekNumbers as $week) {
            if ($previousWeek === null || $week != $previousWeek + 1) {
                if ($startRange !== null) {
                    $weekRanges[] = $startRange . ($previousWeek != $startRange ? '-' . $previousWeek : '');
                }
                $startRange = $week;
            }
            $previousWeek = $week;
        }
    
        if ($startRange !== null) {
            $weekRanges[] = $startRange . ($previousWeek != $startRange ? '-' . $previousWeek : '');
        }
    
        return implode('-', $weekRanges);
    }
    


    
    
   

    
    /**
     * Summary of checkOverlap
     * @param string $start_month_day
     * @param string $end_month_day
     * @param int|string|null $excludeId
     * @param int|string|null $businessId
     * @return bool
     */
    public static function checkOverlap(
                                        string $start_month_day, 
                                        string $end_month_day , 
                                        int | string | null $excludeId = null , 
                                        int | string | null $businessId = null
                                    ): bool
    {
        return self::when( $excludeId , function(Builder $q) use($excludeId): Builder{
                            return $q->where('id','!=',$excludeId );
                        })
                        ->when( $businessId , function(Builder $q) use($businessId): Builder{
                            return $q->where('bo_id',$businessId );
                        })
                        ->where('start_month_day', $start_month_day)
                        ->where('end_month_day', $end_month_day)
                        ->exists();
    }




    /**
     * Summary of scopeAdmin
     * @param \Illuminate\Database\Eloquent\Builder $q
     * @return Builder
     */
    public function scopeAdmin(Builder $q): Builder{
        return $q->whereNull('bo_id');
    }

}
