<?php

namespace App\Builders;

use App\Enums\Common\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseBuilder
{

  private int $code;


  private ? string $message;


  private bool $success;

  private  array $httpHeaders = [];


  private mixed $data = null;


  private array $response = [];


  private array $appends = [];

  private  ? object $business =   null;





  public function __construct(bool $success = true, int $code = Response::HTTP_OK, string $message = 'OK')
  {
      $this->success = $success;
      $this->code = $code;
      $this->message = $message;
  }



  /**
   * Summary of asSuccess
   * @param mixed $code
   * @return ApiResponseBuilder
   */
  public function asSuccess(?int $code = null): static{
      return new static(true, $this->code ?? Response::HTTP_OK, 'OK');
  }



  /**
   * Summary of asError
   * @param mixed $code
   * @return ApiResponseBuilder
   */
  public function asError(?int $code = null): static{
      return new static(false, $code ?? Response::HTTP_BAD_REQUEST, translate(value: 'Error'));
  }



  /**
   * Summary of withMessage
   * @param string $message
   * @param array $replace
   * @param string|null $locale
   * @return ApiResponseBuilder
   */
  public function withMessage(string $message, array $replace = [],  string | null $locale = null): static{

      $this->message = trans(key: $message, replace: $replace, locale: $locale ?? app()->getLocale());
      return $this;
  }

  /**
   * @param  array  $headers
   * @return $this
   */
  public function withHttpHeaders(?array $headers): self
  {
      $this->httpHeaders = $headers;
      return $this;
  }

  
  /**
   * Summary of withHttpCode
   * @param int $code
   * @return \App\Builders\ApiResponseBuilder
   */
  public function withHttpCode(int $code): self
  {
      $this->code = $code;
      return $this;
  }

  

  /**
   * Summary of withData
   * @param mixed $resource
   * @param mixed $resourceNamespace
   * @return \App\Builders\ApiResponseBuilder
   */
  public function withData(mixed $resource, mixed $resourceNamespace = null): self{

        $data = [];
        if (is_array(value: $resource)) {
            foreach ($resource as $key => $res) {
                $resNamespace = $resourceNamespace[$key] ?? null;
                $data[$key] = $this->formatResource(resource: $res, resourceNamespace: $resNamespace);
                if ($res instanceof LengthAwarePaginator)  $this->appendPaginationMeta(resource: $res, key: "{$key}_pagination_meta");
            }
        } else {
            $data = $this->formatResource(resource: $resource, resourceNamespace: $resourceNamespace);
            if ($resource instanceof LengthAwarePaginator) {
                $this->appendPaginationMeta(resource: $resource, key: 'pagination_meta');
            }
        }
        $this->data = $data;
        return $this;
  }

  

    /**
     * Summary of formatResource
     * @param mixed $resource
     * @param mixed $resourceNamespace
     * @return mixed
     */
    private function formatResource(mixed $resource, mixed $resourceNamespace): mixed
    {

        if (!empty($resourceNamespace)) {


            if ($resource instanceof LengthAwarePaginator || $resource instanceof Collection) {
                $resourceCollection = $resourceNamespace::collection($resource);
                return $resourceCollection;
            }

            $resourceInstance = $resourceNamespace::make($resource);
            return $resourceInstance;
        }

        return $resource instanceof LengthAwarePaginator ? $resource->items() : $resource;
    }



    /**
     * Summary of appendPaginationMeta
     * @param mixed $resource
     * @param string $key
     * @return void
     */
    private function appendPaginationMeta(mixed $resource, string $key): void{

        $currentPage = $resource->currentPage();
        $lastPage = $resource->lastPage();

        $this->append(key: $key, value: [
            'total'         => $resource->total(),
            'per_page'      => $resource->perPage(),
            'current_page'  => $resource->currentPage(),
            'last_page'     => $resource->lastPage(),
            'from'          => $resource->firstItem(),
            'to'            => $resource->lastItem(),
            'prev_page_url' => $resource->previousPageUrl(),
            'next_page_url' => $resource->nextPageUrl(),
            'prev_page'      => $currentPage > 1 ? $currentPage - 1 : null,
            'next_page'      => $currentPage < $lastPage ? $currentPage + 1 : null,
            'path'          => $resource->path(),
            'query'         => app(abstract: 'request')->query(),
        ]);
    }


  

  /**
   * Summary of build
   * @return JsonResponse
   */
  public function build(): JsonResponse
  {
      $this->response['success'] = $this->success;
      $this->response['code']    = $this->code;
      $this->response['message'] = $this->message;

      if (! empty($this->data)) $this->response['data'] = $this->data;
      if (! empty($this->appends))  $this->response = array_merge($this->response, $this->appends);

      return response()->json(
          data    : $this->response,
          status  : $this->code,
          headers : $this->httpHeaders
      );
  }




  /**
   * Summary of append
   * @param mixed $key
   * @param mixed $value
   * @return ApiResponseBuilder
   */
  public function append(mixed $key, mixed $value): static
  {
      $this->appends[$key] = $value;
      return $this;
  }



  /**
   * Summary of error
   * @param mixed $data
   * @param mixed $message
   * @param mixed $code
   * @param array $appends
   * @throws \Exception
   * @return mixed
   */
  public function error($data = null, $message = null, mixed $code = Response::HTTP_BAD_REQUEST, array $appends = [])
  {
      if (! empty($appends) && ! Arr::isAssoc(array: $appends)){
        return SELF::error(
            data    : ['error' => translate('Appends must be an associative array')],
            code    : Response::HTTP_FORBIDDEN
        );
      }

      return (new static(false, $code, $message ?? translate(value: 'Error')))
          ->when(condition: ! empty($data), callback: function (ApiResponseBuilder $builder) use ($data): ApiResponseBuilder {
              return $builder->withData(resource: $data);
          })
          ->when(! empty($code), function (ApiResponseBuilder $builder) use ($code): ApiResponseBuilder {
              return $builder->withHttpCode($code);
          })
          ->when(! empty($message), function (ApiResponseBuilder $builder) use ($message): ApiResponseBuilder {
              return $builder->withMessage(message: $message);
          })
          ->when(! empty($appends), function (ApiResponseBuilder $builder) use ($appends): ApiResponseBuilder {
              foreach ($appends as $key => $value) {
                  $builder->append(key: $key, value: $value);
              }
              return $builder;
          })

            ->when(request()->is('api/user/*') , function (ApiResponseBuilder $builder) use ($appends): ApiResponseBuilder {
                $user = getAuthUser('user:api');
        
                return $builder->append(key: 'is_user_authenticate', value:     $user &&  $user->status == Status::ACTIVE->value);

             })
            ->build();


       
  }


  
  /**
   * Summary of success
   * @param mixed $resource
   * @param mixed $message
   * @param mixed $code
   * @param mixed $resourceNamespace
   * @param array $appends
   * @throws \Exception
   * @return mixed
   */
  public function success(mixed $resource = null, mixed $message = null, mixed $code = Response::HTTP_OK,  mixed $resourceNamespace = null, array $appends = []): mixed
  {
    if (! empty($appends) && ! Arr::isAssoc(array: $appends)){
        return SELF::error(
            data    : ['error' => translate(value: 'Appends must be an associative array')],
            code    : Response::HTTP_FORBIDDEN
        );
      }
      return (new static(true, $code, $message ?? 'OK'))
          ->when(condition: ! empty($resource), callback: function (ApiResponseBuilder $builder) use ($resource, $resourceNamespace): ApiResponseBuilder {
              return $builder->withData(resource: $resource, resourceNamespace: $resourceNamespace);
          })
          ->when(! empty($code), function (ApiResponseBuilder $builder) use ($code): ApiResponseBuilder {
              return $builder->withHttpCode(code: $code);
          })
          ->when(! empty($message), function (ApiResponseBuilder $builder) use ($message): ApiResponseBuilder {
              return $builder->withMessage(message: $message);
          })
          ->when(! empty($appends), function (ApiResponseBuilder $builder) use ($appends): ApiResponseBuilder {
              foreach ($appends as $key => $value) {
                  $builder->append(key: $key, value: $value);
              }
              return $builder;
          })
          ->build();
  }


  /**
   * Summary of when
   * @param bool $condition
   * @param callable $callback
   * @return mixed
   */
  public function when(bool $condition, callable $callback): mixed
  {
    return $condition ?  $callback($this) :  $this;
  }
}
