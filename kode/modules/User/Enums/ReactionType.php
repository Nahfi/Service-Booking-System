<?php
namespace Modules\User\Enums;

use App\Enums\EnumTrait;

enum ReactionType: string
{

    use EnumTrait;

    case LIKE  = 'like';
    case LOVE  = 'love';
    case LAUGH = 'laugh';
    case WOW   = 'wow';
    case ANGRY = 'angry';
    case SAD   = 'sad';

    /**
     * Summary of getValues
     * @return array
     */
    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }

}
