<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class IsValidEmail implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return preg_match('/^[\w.-]+@\w+(\.[a-z]{2,})+$/i', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.is_valid_email', ['attribute' => trans('validation.attributes.email')]);
    }
}
