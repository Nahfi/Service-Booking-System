<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Intervention\Image\Laravel\Facades\Image;


class CoreController extends Controller
{
    

     /**
      * create default image
      *
      * @param string $size
      * @return Response
      */
      public function defaultImageCreate(string $size)  :Response {

        $width   = explode('x',$size)[0];
        $height  = explode('x',$size)[1];
        $img     = Image::canvas( $width,$height ,'#ccc');
        $text    = $width . 'X' . $height;

        $fontSize     = $width > 100 && $height > 100 
                              ? 60 : 20;

    
        $img->text($text, $width / 2,  $height / 2, function ($font) use($fontSize) {
            $font->file(realpath('assets/font') . DIRECTORY_SEPARATOR . 'RobotoMono-Regular.ttf'); 
            $font->color('#000');
            $font->align('center');
            $font->valign('middle');
            $font->size($fontSize);
        });

        return $img->response('png');

     }


}
