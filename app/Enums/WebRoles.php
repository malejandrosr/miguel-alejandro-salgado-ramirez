<?php

namespace App\Enums;

/**
 * Generate names of web panel roles.
 */
enum WebRoles: string
{
    case ADMINISTRATOR = 'administrator';

    /**
     * @return string
     */
    public function label() {
        return static::getLabel($this);
    }

    /**
     * @param \App\Enums\WebRoles  $value
     * @return string
     */
    protected static function getLabel(self $value)
    {
        return match($value) {
            WebRoles::ADMINISTRATOR => 'Administrador',
        };
    }
}
