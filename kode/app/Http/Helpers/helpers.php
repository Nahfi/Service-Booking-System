<?php

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Enums\Settings\SettingKey;
use Illuminate\Support\Facades\App;
use App\Enums\Settings\GlobalConfig;
use Illuminate\Support\Facades\Artisan;
use Intervention\Image\Laravel\Facades\Image;
use Stevebauman\Location\Facades\Location;
use Jenssegers\Agent\Agent;


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



   if (!function_exists('getDefaultUser')) {


         /**
          * Summary of getDefaultUser
          * @return User|null
          */
         function getDefaultUser(): User | null{

                return  User::parentUser()
                                 ->where('email' , 'demouser@gmail.com')
                                 ->first();
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




   if (!function_exists('paginateNumber')) {

      /**
       * Summary of paginateNumber
       * @param int $default
       * @return array|Modules\Settings\Models\Settings|string|null
       */
      function paginateNumber(int $default = 10){
         return site_settings(SettingKey::PAGINATION_NUMBER->value);
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



   if (!function_exists('getIpInfo')) {

         /**
          * Summary of getIpInfo
          * @param mixed $ip
          * @return array{browser: bool|string, city: string|null, country: string|null, country_code: string|null, device: bool|string, ip: mixed, latitude: string|null, longitude: string|null, os: bool|string, region: string|null, timezone: string|null}
          */
         function getIpInfo(mixed  $ip = null): array{

               $ip =  $ip  ?? request()->ip();
               $location = Location::get('45.248.150.194');


               $agent = new Agent();
               $os = $agent->platform();
               $browser = $agent->browser();
               $device = $agent->device();


               return [
                     'ip'           => $ip,
                     'country'      => is_object($location) ? $location->countryName ?? 'Unknown' : 'Unknown',
                     'country_code' => is_object($location) ? $location->countryCode ?? null : null,
                     'region'       => is_object($location) ? $location->regionName ?? 'Unknown' : 'Unknown',
                     'city'         => is_object($location) ? $location->cityName ?? 'Unknown' : 'Unknown',
                     'latitude'     => is_object($location) ? $location->latitude ?? null : null,
                     'longitude'    => is_object($location) ? $location->longitude ?? null : null,
                     'timezone'     => is_object($location) ? $location->timezone ?? null : null,
                     'os'           => $os ?? 'Unknown',
                     'browser'      => $browser ?? 'Unknown',
                     'device'       => $device ?? 'Unknown',
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
		function get_date_time(string | null  $date, ?string $timeZone = null , ?string $format = null) :string | null
		{
            if(!$date) return null;

            $timeZone =  site_settings(SettingKey::TIME_ZONE->value );

            $format   =  site_settings(SettingKey::DATE_FORMAT->value)." ".site_settings(SettingKey::TIME_FORMAT->value);

            return  Carbon::createFromFormat('Y-m-d H:i:s', $date, 'UTC')
                              ->setTimezone($timeZone)
                              ->format($format);

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
   function getAuthUser(string $guard = 'user_api' ,  array $load = []): mixed
   {

      return auth()?->guard($guard)
                     ?->user()
                     ?->load($load);
   }

}





if (!function_exists('check_permission')){


   /**
    * Summary of check_permission
    * @param App\Models\User $user
    * @param string $accessPermission
    * @return bool
    */
   function check_permission(User $user, string $accessPermission) :bool{

       return ((in_array($accessPermission, array_merge(...(array) $user?->role?->permissions))));
   }
}

