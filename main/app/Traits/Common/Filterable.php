<?php

namespace App\Traits\Common;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

trait Filterable
{

    /**
     * Get Only Recycled Data
     *
     * @param Builder $q
     * @return Builder
     */
    public function scopeRecycle(Builder $q): Builder{
        return $q->when(value: request()->has('is_trash'),
                      callback: fn(Builder $query): Builder => $query->onlyTrashed());
    }

    /**
     * scope search filter
     *
     * @param Builder $query
     * @param array $params
     * @param boolean $like
     * @return Builder
     */
    public function scopeSearch(Builder $query,array $params,bool $like = true)  :Builder{

        $search = request()->input(key: "search");
        if (!$search) return $query;
        $search = $like ? "%$search%" : $search;

        return $query->where(column: function(Builder $q) use ($params, $search): Collection {
               return collect(value: $params)->map(callback: function(string $param) use($q,$search): Builder  {
                    return $q->when(value: (strpos(haystack: $param, needle: ':') !== false),
                      callback: fn(Builder $q) :Builder => $this->searchRelationalData(query: $q, relations: $param, search: $search),
                          default: fn(Builder $q): Builder => $q->orWhere(column: $param, operator: 'LIKE', value: $search));});});
    }


    /**
     * Scope filter
     *
     * @param Builder $query
     * @param array $params
     * @return Builder
     */
    public function scopeFilter(Builder $query,array $params): Builder{

        $filters   = array_keys(request()->all());

        collect(value: $params)->map(callback: function(string $param) use($query,$filters) : Builder{

            return $query->when(value: (strpos(haystack: $param, needle: ':') !== false),
                        callback: fn(Builder $q): Builder =>
                              $this->filterRelationalData(query: $query, relations: $param, filters: $filters),
                                    default: fn(Builder $query): Builder =>
                                        $query->when(value: in_array(needle: $param, haystack: $filters) && request()->input($param) !== null ,
                                            callback: fn(Builder $query): Builder => $query->when(value: gettype(value: request()->input(key: $param)) === 'array',
                                                callback: fn(Builder $query) : Builder => $query->whereIn(column: $param,  values: request()->input(key: $param)),
                                                   default: fn(Builder $query) : Builder =>  $query->where(column: $param, operator: request()->input(key: $param)))));
                        });

        return $query;


    }

    /**
     * Date Filter
     *
     * @param Builder $query
     * @param string $column
     * @return Builder
     */
    public function scopeDate(Builder $query, string $column = 'created_at') : Builder {

        try {
            if (!request()->input('date'))   return $query;

            $dateRangeString             = request()->input('date');
            $dateRangeString             = preg_replace('/\s*-\s*/', ' - ', $dateRangeString);
            $start_date                  = $dateRangeString;
            $end_date                    = $dateRangeString;
            if (strpos(haystack: $dateRangeString, needle: ' - ') !== false) list($start_date, $end_date) = explode(separator: " - ", string: $dateRangeString);

            $start_date = Carbon::createFromFormat(format: 'm/d/Y', time: $start_date)->format('Y-m-d');
            $end_date   = Carbon::createFromFormat(format: 'm/d/Y', time: $end_date)->format('Y-m-d');


            return $query->where(fn (Builder $query): Builder =>
                            $query->whereBetween(column: $column , values: [$start_date, $end_date])
                                    ->orWhereDate(column: $column , operator: $start_date)
                                    ->orWhereDate(column: $column , operator: $end_date));
        } catch (\Throwable $th) {
            return $query;
        }
    }








    /**
     * Search relational data
     *
     * @param Builder $query
     * @param string  $relations
     * @param string $search
     * @return Builder
     */
    private function searchRelationalData(Builder $query,string $relations, string $search): Builder{

        list($relation, $keys) = explode(separator: ":", string: $relations);
        collect(value: explode(separator: ',',string: $keys))->map(callback: fn(string $column): Builder =>
            $query->orWhereHas( relation: $relation , callback: fn (Builder $q)  : Builder =>  $q->where($column,'like', $search))
        );

        return $query;
    }


    /**
     * Filter relational data
     *
     * @param Builder $query
     * @param string $relations
     * @param array $filters
     * @return Builder
     */
    private function filterRelationalData(Builder $query,string $relations,array $filters): Builder{


        list($relation, $keys) = explode(separator: ":", string: $relations);

        collect(value: explode(separator: ',', string: $keys))->map( callback: fn(string $column): Builder =>
                $query->when( in_array($relation, $filters) && request()->input( $relation) != null ,
                         fn(Builder $query) :Builder => $query->whereHas( $relation,
                                  fn(Builder $q) :Builder => $q->where($column,request()->input($relation)))));
        return $query;
    }




}

