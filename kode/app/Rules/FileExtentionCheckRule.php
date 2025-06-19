<?php

namespace App\Rules;

use Closure;
use App\Enums\Settings\SettingKey;
use Illuminate\Contracts\Validation\ValidationRule;

class FileExtentionCheckRule implements ValidationRule
{



/**
     * Create a new rule instance.
     *
     * @return void
     */
    public $extention;
    public $type;
    public $message;
    public $counter;
    public function __construct(mixed $extention,string $type = 'File' ,int $counter = 0)
    {
       $this->extention     = $extention;
       $this->type          = $type;
       $this->counter       = $counter;
    }


    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        
        $flag = 1;

        if(is_array(value: $value)){
           
            if(count($value) + $this->counter > (int) site_settings(SettingKey::MAX_FILE_UPLOAD->value)){
                $this->message = " ".translate("You Can Not Upload More Than ").site_settings(SettingKey::MAX_FILE_UPLOAD->value).translate(' File At a Time');
                $flag = 0;
            }
            else{
                foreach($value as $file){
                    $flag = $this->checkRule($file);
                    if($flag == 0) break;
                }
            }

        }
        else{

            $flag = $this->checkRule($value);
         
        }

        if( $flag == 0)   $fail($this->message);


    }


    public function checkRule(mixed $file) : int{
        
        $fileSizeInBytes = $file->getSize();
        $indicator = 1;
        if( round($fileSizeInBytes / 1024) >  (int) site_settings(SettingKey::MAX_FILE_SIZE->value) ){
            $this->message = translate($this->type.' Size Must be Under '). site_settings(SettingKey::MAX_FILE_SIZE->value) . translate('KB');
            $indicator = 0;
        }
        elseif(!in_array($file->getClientOriginalExtension(), $this->extention)){
            $this->message = translate($this->type.' Must be '.implode(", ", $this->extention).' Format');
            $indicator = 0;
        }
        return  $indicator;
    }

    
}
