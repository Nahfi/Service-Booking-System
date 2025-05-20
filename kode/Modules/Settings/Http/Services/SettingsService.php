<?php

namespace Modules\Settings\Http\Services;

use App\Enums\Settings\GlobalConfig;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Rules\FileExtentionCheckRule;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Modules\Settings\Enums\DefaultSettings;
use Modules\Settings\Http\Resources\SettingsResource;
use Modules\Settings\Models\Settings;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SettingsService 
{


    use Fileable , ModelAction;

     
     /**
      * Summary of getSettings
      * @return JsonResponse
      */
     public  function getSettings(): JsonResponse{

        $group       = request()->input('group');
        $key         = request()->input('key') ??  null;
        $dataPerPage = request()->input('dataPerPage') ??  null;
        
        $settings = Settings::with(['file'])
                             ->when( $group , fn(Builder $q): Builder => $q->where('group',$group))
                             ->when($key , fn(Builder $q):Settings | null => $q->where('key',  $key)->first(),

                             fn(Builder $q): mixed => $q->when($dataPerPage && $dataPerPage > 0 , 
                                       fn(Builder $q): LengthAwarePaginator => $q->paginate($dataPerPage)
                                                                  ->appends(request()->all()),
                                                   fn(Builder $q): Collection => $q->get() )
                                       
                             );
        

        return ApiResponse::asSuccess()
                    ->withData(resource: $settings,resourceNamespace: SettingsResource::class)
                    ->build();

      
     }

     
   

     /**
      * Summary of save
      * @param \Illuminate\Http\Request $request
      * @return JsonResponse
      */
     public function save(Request $request): JsonResponse{


        $validations = $this->getValidationRules();
        $validator   = Validator::make( data     : $request->all(),
                                        rules    : $validations['rules'] ,
                                        messages : $validations['messages']);

        if ($validator->fails())  
            throw new ValidationException(validator: $validator,  
                response: ApiResponse::error(
                    data : ['errors' => $validator->errors()],
                    code : Response::HTTP_BAD_REQUEST
                )); 


        $parentUser  = parent_user();

        $jsonKeys = GlobalConfig::SETTINGS_JSON_KEYS;
        
        collect($request->input('site_settings'))
            ->map(function(mixed $value, string $key) use($jsonKeys, $parentUser): void{


                    $isLogo = in_array($key ,DefaultSettings::LOGO_KEYS);

                    $value = ((in_array($key , $jsonKeys) || is_array($value)) 
                                            ? json_encode($value) 
                                            : $value);
            

                     DB::transaction(function() use($parentUser ,$key , $value , $isLogo): void{

                            $setting = Settings::with(['file'])->firstOrNew([
                                                                                    'user_id' => $parentUser->id, 
                                                                                    'key'     => $key, 
                                                                                    'group'   => $isLogo 
                                                                                                    ? SettingKey::LOGO->value
                                                                                                    : SettingKey::GENERAL->value
                                                                                ]);

                    

                            $setting->value = !($isLogo) ? $value : null;
                            $setting->save();



                            if($isLogo) $this->saveLogo($setting , $value , $key);
                            
                     });

                });


        optimize_clear();

        return ApiResponse::asSuccess()
                            ->build();

     }



     
     /**
      * Summary of saveLogo
      * @param \Modules\Settings\Models\Settings $setting
      * @param mixed $file
      * @param string $key
      * @return void
      */
     private function saveLogo(Settings $setting ,mixed $file, string $key): void{

        if(is_file($file->getPathname())){
               $this->saveFile(
                                model: $setting,
                                response: $this->storeFile(
                                                                file: $file, 
                                                                location : GlobalConfig::FILE_PATH[$key]['user']['path'], 
                                                                removeFile: $setting?->file
                                                          ),
                                type: $key
                            );
        }
     }


   
    /**
     * Summary of getDefaultValidationRules
     * @return array{messages: string[], rules: array}
     */
    private  function getValidationRules():array{

        $rules       = [];
        $messages    = [];
        $requestKey = 'site_settings';

        $requestData = request()->input($requestKey);

        $logoValidationRule = [
                                'nullable', 
                                'image', 
                                new FileExtentionCheckRule(json_decode(site_settings(SettingKey::MIME_TYPES->value),true))
                              ];

        collect(array_keys($requestData))
            ->map(function(string $key)use(&$rules ,&$messages ,$requestKey , $logoValidationRule) :void {

                $rules[$requestKey.".".$key] = in_array($key ,DefaultSettings::LOGO_KEYS)
                                                    ?  $logoValidationRule
                                                    : (in_array($key ,DefaultSettings::NUMERIC_KYES) 
                                                                ?  ['required','numeric','gte:0','max:50000']
                                                                :  ['required']);

                $messages[$requestKey.".".$key.'.required'] = ucfirst(str_replace('_',' ',$key)).' '.translate('Feild is Required');

            });

        return ['rules' => $rules, 'messages' => $messages];
    }
   
    
}
