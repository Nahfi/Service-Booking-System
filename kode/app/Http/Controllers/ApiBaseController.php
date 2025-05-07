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

    /**
     * Summary of cronRun
     * @return void
     */
    public function cronRun(): void{

        try {
            
            Artisan::call('backup:run');
            Setting::updateOrInsert(
                    ['key'    =>'last_system_backup' , 'group' => SettingKey::DEFAULT->value ] ,
                    ['value'  => Carbon::now()]
            );

        } catch (\Throwable $th) {
        
        }

    }

    
}
