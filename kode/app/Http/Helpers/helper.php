<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\Setting;
use App\Models\Admin\Admin;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\Settings\CacheKey;
use App\Enums\Settings\SettingKey;
use Illuminate\Support\Facades\App;
use App\Enums\Settings\GlobalConfig;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;
use Intervention\Image\Laravel\Facades\Image;


   if(!function_exists('optimize_clear')){
      function optimize_clear(){
         Artisan::call('optimize:clear');
      }
   }
   
   if (!function_exists('limit_words')) {
         function limit_words(string $text, int|string $limit) :string  {
            return Str::limit($text, $limit, $end='...');
         }
   }


   if (!function_exists('trx_number')) {

      function trx_number(int $length = 12): string {

         $timestampPart = generateUniqueCode(min($length, 6), min($length, 6));

         $remainingLength = $length - strlen($timestampPart);
         $randomString = '';

         if ($remainingLength > 0) {
            $characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
            $charactersLength = strlen($characters);

            for ($i = 0; $i < $remainingLength; $i++) {
                  $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
         }

         return $timestampPart . $randomString;
      }
   }
  


   if (!function_exists('limitText')) {

      /**
       * @param $text
       * @param $length
       * @return string
       */
      function limitText(string $text, int | string $length): string
      {
         return Str::limit($text, $length);
      }

  }

 



   if (!function_exists('site_settings')) {
      function site_settings(string  $key = null , mixed $default = null):string|array|null {

         try {
           



         } catch (\Throwable $th) {

         }

 
      }
   }

   
   
   if (!function_exists('get_default_currency')) {

      /**
       * Summary of get_default_currency
       * @return App\Models\Setting
       */
      function get_default_currency():Setting {

                           return Setting::system()
                                    ->currency()
                                    ->defaultKey()
                                    ->first();
      }
   }
   


   if (!function_exists('num_format')){


      /**
       * Summary of num_format
       * @param int|float $number
       * @param mixed $currency
       * @param mixed $decimal
       * @param mixed $calC
       * @param mixed $symbol
       * @return string|int
       */
      function num_format(int | float  $number , ?Setting $currency = null ,mixed $decimal  = null, $symbol = true) :string | int{

         $decimal    =   $decimal ?? (int)site_settings(SettingKey::DECIMAL_DIGIT->value);
   
         $ds         =   site_settings(SettingKey::DECIMAL_SEPARATOR->value);
         $ts         =   site_settings(SettingKey::THOUSAND_SEPARATOR->value);
         $currencyAlignment =  site_settings(SettingKey::CURRENCY_ALIGNMENT->value);
     
         $currency   = $currency ?? get_default_currency();

         $decodedCurrency = $currency->value 
                              ? json_decode($currency->value, true) 
                              : [];

         $symbol  = Arr::get($decodedCurrency, "symbol");
         $famount = (number_format($number,$decimal, $ds, $ts));
         
         if($currencyAlignment && $currency && $symbol){
            $famount = str_replace(['[symbol]', '[amount]'], [$symbol, $famount],$currencyAlignment);
         }

        return $famount ;
      }
   }



   
if( !function_exists('getPaginationNumber') ){

   /**
    * Summary of getPaginationNumber
    * @param int $defaultValue
    * @return int
    */
   function getPaginationNumber(int $defaultValue = 10) :int{   


          try {


            $settings = Cache::get(CacheKey::DEFAULT_SETTINGS->value)
                              ->where('key',SettingKey::PAGINATION_NUMBER->value)
                              ->first();

            
             return $settings && @$settings->value 
                          ? @$settings->value
                          : $defaultValue ;



            
         
          } catch (\Throwable $th) {

          }



       return $defaultValue;
   }
}


 


   if (!function_exists('get_appearance')) {
      
      function get_appearance(bool $is_arr = false , bool $sortable = true) {
         $sectionJson = resource_path('views/partials/appearance.json');
         $appearances = json_decode(file_get_contents($sectionJson), $is_arr ? true :false);
         if ($is_arr && $sortable)  ksort($appearances);
         return $appearances;
      }
   }

   if (!function_exists('site_logo')) {
      function site_logo(string  $key):string|array|object|null {

         $settings = Cache::remember('site_logos',24 * 60, function ()   {
            return Setting::with(['file'])->whereIn("key",Arr::get(config('settings'),'logo_keys' ,[]))->get();
         });

         return ($settings->where('key',$key)->first());
      }
   }


   if (!function_exists('paginateNumber')) {
      function paginateNumber(int $default = 10){
         return site_settings('pagination_number' ,$default);
      }
   }


   if (!function_exists('make_slug')){
      function make_slug(mixed $text) :mixed{
         $string  = preg_replace('/\s+/u','-', trim(strtolower($text)));
         $string = preg_replace('/-+/', '-', $string);
         $string = trim($string, '-');
         $string = strtolower($string);
         return  $string ;

      }
   }



   if (!function_exists('unauthorized_message')){
         function unauthorized_message(string $message='Unauthorized access') :string{
            return translate($message);
         }
   }

	if (!function_exists('get_system_locale')){
		function get_system_locale(){
         return App::getLocale();
		}
	}






   if (!function_exists('sortByMonth')) {
      function sortByMonth(array $data , bool $numFormat = false , int | array $default  = null) :array{
         $months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
         $sortedArray = [];
         foreach($months as $month){
             $amount =  Arr::get($data,$month, $default ?? 0);

             switch (is_array($amount)) {
               case true:
                  $amount = collect($amount)->map(fn(int | float $value, string $key)  :int | float => 
                            $numFormat ? currency_conversion(number :round($value)) : round($value))->all();
                  break;
               
               default:
                  $amount = $numFormat ? currency_conversion(number :round($amount)) : round($amount);
                  break;
             }

             $sortedArray[$month] =  $amount;
         }
         return $sortedArray;
      }
  }

 

  
	if (!function_exists('diff_for_humans')){

      /**
       * Summary of diff_for_humans
       * @param string $date
       * @return string
       */
		function diff_for_humans(string  $date) :string
		{
			return Carbon::parse($date)->diffForHumans();
		}
   }

  


   if (!function_exists('notificationMessage')){

      /**
       * Summary of notificationMessage
       * @param array $tmpCodes
       * @param string $body
       * @param object $userinfo
       * @return string
       */
      function notificationMessage(array $tmpCodes , string $body , object $userinfo ) : string{

         return str_replace(
            array_map(function ($key) {
                return '{{' . $key . '}}';
            }, array_keys($tmpCodes)),
            array_values($tmpCodes),
            str_replace(["{{name}}", "{{message}}" ,"{{company_name}}","{{phone}}","{{email}}"], [@$userinfo->username ?: $userinfo->name, @$body , site_settings('site_name') ,site_settings('phone') ,site_settings('email')], site_settings('default_mail_template'))
         );

      }
   }


   

  

   if (!function_exists('round_amount')) {

      /**
       * Summary of round_amount
       * @param int|float $amount
       * @param int $precision
       * @return int|float
       */
      function round_amount(int | float $amount, int $precision  = 0) :int|float
      {
         return round($amount,$precision);
      }
   }


   
   if (!function_exists('currency_conversion')){
      

      /**
       * Summary of currency_conversion
       * @param int|float $number
       * @param mixed $currency
       * @return int
       */
      function currency_conversion(int | float  $number ,?Setting $currency = null ) : int{

         // $number = floatval($number) * floatval($currency->exchange_rate);
         // return round(  $number);
      }

   }


   





   if (!function_exists(function: 'key_to_value')){

      /**
       * Summary of key_to_value
       * @param string $text
       * @return string
       */
      function key_to_value(string $text) :string{
         return ucfirst(preg_replace(pattern: "/[^A-Za-z0-9 ]/", replacement: ' ', subject: $text));
      }
   }
   
   if (!function_exists(function: 'value_to_key')){
      /**
       * Summary of value_to_key
       * @param string $text
       * @param mixed $replace
       * @return string
       */
      function value_to_key(string $text ,?string $replace = "_") :string {
         return strtolower(strip_tags(str_replace(' ', $replace, $text)));
      }
   }


   if (!function_exists('generateUniqueCode')) {
      
      /**
       * Generate a unique numeric code based on the current time.
       *
       * @param int $minDigits 
       * @param int $maxDigits
       * @return string 
       */
      function generateUniqueCode(int $minDigits = 6, int $maxDigits = 6): string
      {
         $timestamp = (string) abs(intval(microtime(true) * 1000000));
         $codeLength = rand($minDigits, $maxDigits);
         return str_pad(substr($timestamp, -$codeLength), $codeLength, '0', STR_PAD_LEFT);
      }
  }



   if (!function_exists('generateTicketNumber')){
      /**
       * Summary of generateTicketNumber
       * @return string
       */
      function generateTicketNumber() :string
      {
         $randomNumber = uniqid(); // Generate a unique identifier based on the current time
         $ticketNumber = strtoupper(substr($randomNumber, 0, 8));
         return $ticketNumber;
      }
  }



	if (!function_exists('get_date_time')){
      /**
       * Summary of get_date_time
       * @param string $date
       * @param mixed $format
       * @return string
       */
		function get_date_time(string $date,?string $timeZone = null , ?string $format = null) :string
		{


		}
    }

    if (!function_exists('format_time')) {
         /**
          * Converts a 24-hour time string to a 12-hour formatted time string.
          *
          * @param string $time
          * @param string|null $format
          * @return string
          */
         function format_time(string $time, ?string $format = null): string
         {
        
         }
   }

    if (!function_exists('generateOTP')){

      /**
       * Summary of generateOTP
       * @param int $min
       * @param int $max
       * @return int
       */
      function generateOTP(int $min = 100000, int $max = 999999): int
      {
         return rand($min, $max);

      }
   }


  

    






  
	if (!function_exists('translate')){

      /**
       * Summary of translate
       * @param string $value
       * @return string
       */
      function translate(string $value): string
      {
          $local = App::getLocale();

          try {

              $lang_array = include(base_path(path: 'resources/lang/' . $local . '/messages.php'));
              $value = remove_special_characters(text: $value);
              $key   =  value_to_key(text: $value);

              if (!array_key_exists(key: $key, array: $lang_array)) {
                  $lang_array[$key] = $value;
                  $str = "<?php return " . var_export(value: $lang_array, return: true) . ";";
                  file_put_contents(filename: base_path('resources/lang/' . $local . '/messages.php'), data: $str);
                  return $value;
              } 
              return trans(key: 'messages.' . $key);

          } catch (\Exception $ex) {
               return $value;
          }
      }

   }



   if (!function_exists('remove_special_characters')) {

      /**
       * Summary of remove_special_characters
       * @param string|null $text
       * @return string|null
       */
      function remove_special_characters(string|null $text): string|null
      {
          return str_ireplace(['\'', '"', ',', ';', '<', '>', '?'], ' ', preg_replace('/\s\s+/', ' ', $text));
      }
  }











   //update env method
	if (!function_exists('update_env')){
		function update_env(string $key, string $newValue) :void{
         $path = base_path('.env');
         $envContent = file_get_contents($path);

         if (preg_match('/^' . preg_quote($key, '/') . '=/m', $envContent)) {
            $envContent = preg_replace('/^' . preg_quote($key, '/') . '.*/m', $key . '=' . $newValue, $envContent);
         } else {
            $envContent .= PHP_EOL . $key . '=' . $newValue . PHP_EOL;
         }
        file_put_contents($path, $envContent);

		}
    }



   if (!function_exists('hexa_to_rgba')){
		function hexa_to_rgba(string $code):string
		{
			list($r, $g, $b) = sscanf($code, "#%02x%02x%02x");
			return  "$r,$g,$b";
		}
	}








   if (!function_exists('get_default_img')){
      function get_default_img() :string{
         return asset('assets/images/default/default.jpg');

      }
   }







  

   if (!function_exists('array_to_object')){


      /**
       * Convert array to object
       *
       * @param array $payload
       * @return object
       */
      function array_to_object(array $payload): object{
         return (object) $payload;
      }
   }




  


if (!function_exists('build_dom_document')){
   /**
    * Summary of buildDomDocument
    * @param mixed $text
    */
   function build_dom_document($text,$name ='text_area') :array
   {
       $dom = new \DOMDocument();
       libxml_use_internal_errors(true);
       $dom->loadHTML('<meta charset=utf-8">' . $text);
       libxml_use_internal_errors(false);
       $imageFile = $dom->getElementsByTagName('img');
       if ($imageFile) {
           $files = [];
           foreach($imageFile as $item => $image){
               $data = $image->getAttribute('src');
               $check_b64_data = preg_match("/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).base64,.*/", $data);
               if ($check_b64_data) {
                   list($type, $data) = explode(';', $data);
                   list(, $data)      = explode(',', $data);
                   $imgeData = base64_decode($data);
                   $image_name= $name.time().$item.'.png';
                   $save_path  = GlobalConfig::FILE_PATH['text_editor']['path'];

                   try {
                     
                       if(!file_exists($save_path))  mkdir($save_path, 0755, true);
                       
                       Image::read($imgeData)->save($save_path.'/'.$image_name);

                       $getpath = asset( GlobalConfig::FILE_PATH['text_editor']['path'].'/'.$image_name);

                       $image->removeAttribute('src');

                       $image->setAttribute('src', $getpath);

                       array_push( $files,$image_name);

                   } catch (Exception $e) {

                   }
               }
           }
       }
       $html = $dom->saveHTML();
       $html = html_entity_decode($html, ENT_COMPAT, 'UTF-8');
       return [
           'html'  => $html,
           'files' => $files,
       ];
   }
}











if (!function_exists('generateTicketNumber')){
   
   /**
    * Summary of generateTicketNumber
    * @return string
    */
   function generateTicketNumber() :string
   {
      $randomNumber = uniqid(); 
      $ticketNumber = strtoupper(substr($randomNumber, 0, 8));
      return $ticketNumber;
   }
}




if (!function_exists('getAuthUser')) {


   /**
    * Summary of getAuthUser
    * @param string $guard
    * @param array $load
    * @return mixed
    */
   function getAuthUser(string $guard = 'admin:api' ,  array $load = ['file']): mixed
   {

      return auth()?->guard($guard)
                     ?->user()
                     ?->load($load);
   }

}


if (!function_exists('getTimeZone')) {

 
   /**
    * Summary of getTimeZone
    * @param mixed $user
    * @return string
    */
   function getTimeZone(? User $user = null): string
   {


      
   }

}




if (!function_exists('getTimeFormat')) {

   /**
    * Summary of getTimeFormat
    * @param User $user
    * @return string
    */

   function getTimeFormat(? User $user): string
   {

      
   }

}



if (!function_exists('k2t')){

   /**
    * Summary of k2t
    * @param string $text
    * @return string
    */
   function k2t(string $text) :string{
      return ucfirst(preg_replace("/[^A-Za-z0-9 ]/", ' ', $text));
   }
}

if (!function_exists('t2k')){
   /**
    * Summary of t2k
    * @param string $text
    * @param mixed $replace
    * @return string
    */
   function t2k(string $text ,?string $replace = "_") :string {
      return strtolower(strip_tags(str_replace(' ', $replace, $text)));
   }
}













if (!function_exists('check_permission')){

   function check_permission(Admin $user, string $accessPermission):bool {



         $permissions            = (array)$user?->role?->permissions;
         
         $permission_values      = [];
         foreach ($permissions as $permission) {
            $permission_values   = array_merge($permission_values, $permission);
         }
         
         return ((in_array($accessPermission, $permission_values)));

   }
}

