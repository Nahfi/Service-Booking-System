<?php

namespace App\Traits\Common;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

trait Queryable
{
    /**
     * Apply pagination or collection retrieval based on a header.
     *
     * @param Builder $query
     * @param string $headerKey
     * @param string $headerValue
     * @return LengthAwarePaginator|Collection
     */
    protected function applyIndexQuery(Builder $query, string $headerKey = 'X-Use-Collection', string $headerValue = 'true')
    {
        $useCollection = request()->header($headerKey, 'false') == $headerValue;
        
        return $query->when(
            $useCollection,
            fn(Builder $q): Collection => $q->get(),
            fn(Builder $q): LengthAwarePaginator => $q->paginate(paginateNumber())->appends(request()->all())
        );
    }
}