<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Setting;
use App\Enums\Settings\SettingKey;
use App\Builders\ApiResponseBuilder;
use Illuminate\Support\Facades\Artisan;
use App\Traits\Common\ModelAction;
use App\Traits\Common\Notify;

class ApiBaseController extends Controller
{

    use ModelAction, Notify;
    protected ApiResponseBuilder $responseBuilder;

    public function __construct(ApiResponseBuilder $responseBuilder)
    {
        $this->responseBuilder = $responseBuilder;
    }

    protected function response(): ApiResponseBuilder
    {
        return $this->responseBuilder;
    }

    

    
}
