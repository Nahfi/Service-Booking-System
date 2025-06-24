<?php

namespace Modules\User\Http\Services;

use App\Enums\Settings\SettingKey;
use App\Facades\ApiResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PragmaRX\Google2FA\Google2FA;
use Illuminate\Support\Str;
use Modules\User\Http\Resources\UserResource;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class TwoFactorService 
{



    /**
     * Summary of getSetupCodes
     * @return JsonResponse
     */
    public function getSetupCodes(): JsonResponse{

            $user = getAuthUser();
            $google2fa = new Google2FA();

            $secret = $user->google2fa_secret;

            if (!$user->google2fa_secret || request()->boolean('reset')) {
                $secret = $google2fa->generateSecretKey();
                $user->google2fa_secret = $secret;
                $user->two_factor_enabled = false;
                $user->recovery_codes = $this->generateRecoveryCodes();
                $user->save();
            } 

            $qrText = $google2fa->getQRCodeUrl(
                site_settings(SettingKey::SITE_NAME->value),
                $user->email,
                $secret
            );

            $renderer = new ImageRenderer(new RendererStyle(200), new SvgImageBackEnd());
            $writer = new Writer($renderer);
            $qrCodeSvg = $writer->writeString($qrText);
            $qrCodeBase64 = 'data:image/svg+xml;base64,' . base64_encode($qrCodeSvg);

            return ApiResponse::asSuccess()
                ->withData([
                    'qr_code' => $qrCodeBase64,
                    'secret' => $secret,
                    'recovery_codes' => $user->recovery_codes,
                ])
                ->build();
    }


    
    /**
     * Summary of verify2faCode
     * @param int|string $code
     * @throws \Exception
     * @return JsonResponse
     */
    public function verify2faCode(int | string $code): JsonResponse{

        $user = getAuthUser();
        $google2fa = new Google2FA();

        
        $valid = $google2fa->verifyKey($user->google2fa_secret,  $code , 1);

        if (!$valid)
              throw new Exception(translate("Invalid code"), Response::HTTP_NOT_FOUND);

        $user->two_factor_enabled = true;
        $user->two_factor_confirmed_at = now();
        $user->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $user,resourceNamespace: UserResource::class )
                                ->build();

    }


    /**
     * Summary of disable2fa
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function disable2fa(Request $request): JsonResponse{

        $user = $request->user();
        $user->google2fa_secret = null;
        $user->recovery_codes = null;
        $user->two_factor_enabled = false;
        $user->two_factor_confirmed_at = null;
        $user->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $user,resourceNamespace: UserResource::class)
                                ->build();

    }



     /**
      * Summary of saveNewRecoveryCode
      * @param \Illuminate\Http\Request $request
      * @throws \Exception
      * @return JsonResponse
      */
     public function saveNewRecoveryCode(Request $request): JsonResponse
     {
        $user = $request->user();

        if (!$user->two_factor_enabled) 
             throw new Exception(translate("2FA not enabled"), Response::HTTP_NOT_FOUND);
        
        $user->recovery_codes = $this->generateRecoveryCodes();
        $user->save();

        return ApiResponse::asSuccess()
                                ->withData(resource: $user,resourceNamespace: UserResource::class)
                                ->build();
     }





    /**
     * Summary of generateRecoveryCodes
     * @return string[]
     */
    private function generateRecoveryCodes(): array
    {
        $codes = [];
        for ($i = 0; $i < 8; $i++) {
            $codes[] = Str::random(10) . '-' . Str::random(5);
        }
        return $codes;
    }

    

     
}
