<?php

namespace App\Enums;

/**
 * Generate names of web admin panel roles.
 */
enum WebAdministratorRoles: string
{
    case ADVANCED = 'advanced';
    case MIDDLE = 'middle';
    case BASIC = 'basic';

    /**
     * @return string
     */
    public function label() {
        return static::getLabel($this);
    }

    /**
     * @param \App\Enums\WebAdministratorRoles  $value
     * @return string
     */
    protected static function getLabel(self $value)
    {
        return match($value) {
            WebAdministratorRoles::ADVANCED => 'Avanzado',
            WebAdministratorRoles::MIDDLE => 'Intermedio',
            WebAdministratorRoles::BASIC => 'Básico',
        };
    }
}
