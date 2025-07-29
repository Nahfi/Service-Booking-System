<?php

namespace App\Enums\Common;

use App\Enums\EnumTrait;


enum Status :String {

    use EnumTrait;

    case ACTIVE         = 'active';
    case INACTIVE       = 'inactive';



    /**
     * Summary of values
     * @return string
     */
    public function values(): string
    {
        return match($this)
        {
            self::ACTIVE   => 'Active',
            self::INACTIVE => 'Inactive',
        };
    }




    /**
     * Summary of badge
     * @return void
     */
    public function badge(): void
    {


        $color = match($this) {
            self::ACTIVE    => 'success',
            self::INACTIVE  => 'danger',
        };

        echo "<span class='i-badge {$color}'>{$this->values()}</span>";

    }


    /**
     * Summary of getValues
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

}
