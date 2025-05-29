<?php

namespace Modules\Settings\Http\Controllers\Api\V1;

use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use App\Traits\Common\ModelAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Modules\Settings\Http\Requests\LanguageRequest;
use Modules\Settings\Http\Requests\LanguageStatusUpdateRequest;
use Modules\Settings\Http\Services\LanguageService;
use Modules\Settings\Models\Settings;

class LanguageController extends Controller
{

    use ModelAction;
    public function __construct(protected LanguageService $languageService){
        $this->middleware('user.permission.check:view_language')->only(['index','getTranslation']);
        $this->middleware('user.permission.check:save_language')->only(['store', 'update', 'updateStatus','translate','makeDefault','toggleDirection']);
        $this->middleware('user.permission.check:destroy_language')->only(['destroy']);
    }



    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): JsonResponse
    {
        return $this->languageService->getLanguages();
    }


    /**
     * Store a newly created resource in storage.
     * @param LanguageRequest $request
     * @return Response
     */
    public function store(LanguageRequest $request): JsonResponse
    {
      return  $this->languageService->save($request);
    }

   
    /**
     * Update the specified resource in storage.
     * @param LanguageRequest $request
     * @param int $id
     * @return Response
     */
    public function update(LanguageRequest $request, int | string $id): JsonResponse
    {
        return  $this->languageService->save($request);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy(int | string $id): JsonResponse
    {
        return  $this->languageService->destroy(id: $id);
    }


    
    /**
     * Summary of updateStatus
     * @param \Modules\Settings\Http\Requests\LanguageStatusUpdateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(LanguageStatusUpdateRequest $request): JsonResponse{

        return $this->changeStatus(request: $request->except(keys: "_token"),actionData: [
            "model"                    => new Settings(),
            "filterable_attributes"    => ['id' => $request->input('id'), 'group' => SettingKey::LANGUAGES->value ],
        ]);
    }



     /**
     * Summary of getTranslation
     * @param string $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTranslation(string $code): JsonResponse{


        $language =  Settings::language()
                            ->where('key',$code)
                            ->firstOrFail();


        $filePath = base_path('resources/lang/' . $language->key . '/messages.php');

        if (!file_exists($filePath)) {
            throw new \Exception(translate("Translation file for the selected language was not found."));
        }

        $languageArr = include($filePath);

        return ApiResponse::asSuccess()
                    ->withData($languageArr)
                    ->build();

    }



     
    
    /**
     * Summary of translate
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function translate(Request $request): JsonResponse | array{

    
        $validator = Validator::make($request->all() ,rules: [
            'code'                 => 'required',
            'key_values'           => 'required|array',
        ]);

        
        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
                                                                    data    : ['errors' => $validator->errors()],
                                                                    code    : Response::HTTP_BAD_REQUEST));


        return  $this->languageService->translate($request);
        
    }




    /**
     * Summary of makeDefault
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\JsonResponse
     */
    public function makeDefault(Request $request): JsonResponse{

        $validator = Validator::make($request->all() ,rules: [
            'id'            => 'required|exists:settings,id',
        ]);

        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
                                                                    data    : ['errors' => $validator->errors()],
                                                                    code    : Response::HTTP_BAD_REQUEST
                                                                ));


        return  $this->languageService->setDefaultLanguage($request->input('id'));

                                                        
    }



    /**
     * Summary of toggleDirection
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleDirection(Request $request): JsonResponse{

        $validator = Validator::make($request->all() ,rules: [
            'id'            => 'required|exists:settings,id',
        ]);

        if ($validator->fails())  throw new ValidationException( validator: $validator,  response: ApiResponse::error(
                                                                    data    : ['errors' => $validator->errors()],
                                                                    code    : Response::HTTP_BAD_REQUEST
                                                                ));
        
        return  $this->languageService->switchDirection($request->input('id'));
    }





}
