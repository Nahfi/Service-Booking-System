<?php

namespace App\Traits\Common;

use App\Enums\Common\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

trait Loadable
{
     public function scopeLoadRelations(Builder $query, array|null $relations = null, User|null $user = null): Builder
     {
          if (!$relations) return $query;

          $toLoad = [];
          $toCount = [];

          foreach ($relations as $relation) {

               $relationParts  = explode('.', $relation);
               $currentModel   = $this;
               $validRelation  = true;

               foreach ($relationParts as $part) {
                    
                    if (!method_exists($currentModel, $part)) {
                         $validRelation = false;
                         break;
                    }

                    $relationMethod = $currentModel->$part();
                    $currentModel   = $relationMethod->getRelated();
               }

               if (!$validRelation) continue;
               
               $loadParam  = "load_{$relation}";
               $countParam = "load_{$relation}_count";

               if (request()->has($loadParam) 
                    && request()->input($loadParam) == Status::ACTIVE) $toLoad[] = $relation;
               
               

               if (request()->has($countParam) 
                    && request()->input($countParam) == Status::ACTIVE) $toCount[] = $relation;
          }

          return $query->with($toLoad)->withCount($toCount);
     }
}
