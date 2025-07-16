<?php

namespace Modules\Settings\Http\Services;

use App\Enums\Common\Status;
use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Traits\Common\Fileable;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Modules\Settings\Http\Resources\LanguageResource;
use Modules\Settings\Models\Settings;

class LanguageService
{


    use Fileable , ModelAction;


    /**
     * Summary of getLanguages
     * @return JsonResponse
     */
    public function getLanguages(): JsonResponse{

        $languages =  Settings::latest()->language()->get();
        return ApiResponse::asSuccess( )
                            ->withData(resource: $languages,resourceNamespace: LanguageResource::class )
                            ->build();
    }



    /**
     * Summary of save
     * @param \Illuminate\Http\Request $request
     * @throws \Exception
     * @return JsonResponse
     */
    public  function save(Request $request): JsonResponse{

        $key            = $request->input('lang_code');

        if(Settings::language()
                    ->where('key',$key)->exists())
                         throw new \Exception(translate('Language already exists'),Response::HTTP_FORBIDDEN);



        $language             = new Settings();
        $language->group      = SettingKey::LANGUAGES->value;
        $language->key        = $key;
        $language->status     = Status::ACTIVE;
        $language->is_default = false;
        $language->value      = json_encode(value: [
                                    'name'          => $request->input('name'),
                                    'code'          => $key,
                                    'direction'     => $request->input('direction'),
                                ]);

        $language->save();

        $this->createLangFile(langCode: $key);

        return ApiResponse::asSuccess()
                             ->build();

    }


    /**
     * Summary of createLangFile
     * @param string $langCode
     * @return void
     */
    private  function createLangFile(string $langCode): void{

        $langDir = base_path('resources/lang/' . $langCode);
        if (!file_exists($langDir)) {
            mkdir($langDir, 0777, true);
        }

        $langFilePath = $langDir . '/messages.php';

        if (!file_exists($langFilePath)){
            $langFile = fopen($langFilePath, "w") or die("Unable to open file!");
            $read = file_get_contents(base_path('resources/lang/en/messages.php'));
            fwrite($langFile, $read);
            fclose($langFile);
        }

    }



    /**
     * Summary of destroy
     * @param int|string $id
     * @return JsonResponse
     */
    public  function destroy(int | string $id): JsonResponse{

        $language = Settings::language()
                                ->where('id',$id)
                                ->where('is_default',false)
                                ->where('key','!=','en')
                                ->firstOrFail();


        $langDir = base_path('resources/lang/' . $language->key);

        if (File::exists($langDir)) {
            File::cleanDirectory(directory: $langDir);
            File::deleteDirectory($langDir);
        }

        $language->delete();

        return ApiResponse::asSuccess()
                            ->withMessage(translate('Language Deleted'))
                            ->build();
    }



    /**
     * Summary of translate
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function translate(Request $request): JsonResponse{


        $language =  Settings::language()
                                ->where('key',$request->input("code"))
                                ->firstOrFail();

        $langArray = include(base_path(path: 'resources/lang/' . $language->key . '/messages.php'));

        collect($request->input('key_values'))
                          ->map(function(string $value , string $key) use(&$langArray): void{
                               if(isset($langArray[$key])) $langArray[$key] = $value;
                          });

        $str = "<?php return " . var_export(value: $langArray, return: true) . ";";
        file_put_contents(filename: base_path('resources/lang/' . $language->key . '/messages.php'), data: $str);

        return ApiResponse::asSuccess()
                                ->build();

    }



    /**
     * Summary of setDefaultLanguage
     * @param int|string $id
     * @return JsonResponse
     */
    public function setDefaultLanguage(int | string $id): JsonResponse{

        $language = Settings::language()
                                    ->where('id',$id)
                                    ->firstOrFail();

        $language->is_default = true;
        $language->save();

        $value  = json_decode($language->value);

        Settings::language()
                        ->where( 'id','!=',$id)
                        ->update(['is_default' => false]);

        app()->setLocale($value->code);

        return ApiResponse::asSuccess()
                             ->build();

    }




    /**
     * Summary of switchDirection
     * @param int|string $id
     * @return JsonResponse
     */
    public function switchDirection(int | string $id): JsonResponse{

        $language = Settings::language()
                                    ->where('id',$id)
                                    ->firstOrFail();

        $value      = json_decode($language->value,true);
        $direction  = Arr::get( $value ,'direction' ,'ltr');

        $value['direction'] = $direction == 'ltr' ? 'rtl' : 'ltr';
        $language->value = json_encode($value);
        $language->save();

        return ApiResponse::asSuccess( )
                            ->withData(resource: $language,resourceNamespace: LanguageResource::class )
                            ->build();

    }



}
