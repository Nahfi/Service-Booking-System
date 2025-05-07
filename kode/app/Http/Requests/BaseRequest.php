<?php

namespace App\Http\Requests;

use App\Builders\ApiResponseBuilder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use App\Facades\ApiResponse;
use Illuminate\Http\Response;

abstract class BaseRequest extends FormRequest
{
    protected ApiResponseBuilder $responseBuilder;


    /**
     * Summary of __construct
     * @param \App\Builders\ApiResponseBuilder $responseBuilder
     */
    public function __construct(ApiResponseBuilder $responseBuilder)
    {
        $this->responseBuilder = $responseBuilder;
    }


    /**
     * Summary of failedValidation
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @throws \Illuminate\Validation\ValidationException
     * @return never
     */
    protected function failedValidation(Validator $validator): never
    {
        $errors = $validator->errors();
        
        throw new ValidationException(validator: $validator, response: ApiResponse::error(
            data    : ['errors' => $errors],
            code    : Response::HTTP_BAD_REQUEST
        ));
    }

}
