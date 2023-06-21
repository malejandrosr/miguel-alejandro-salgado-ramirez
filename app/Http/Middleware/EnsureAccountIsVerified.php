<?php

namespace App\Http\Middleware;

use App\Exceptions\GenericException;
use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class EnsureAccountIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string|null  $redirectToRoute
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|null
     */
    public function handle($request, Closure $next)
    {
        if (
            !$request->user() ||
            ($request->user() instanceof MustVerifyEmail && !$request->user()->hasVerifiedEmail())
        ) {
            /** @var \App\Models\User $user */
            $user = $request->user();

            throw new GenericException(__('Account of :name isn’t verified.', ['name' => "{$user->name} {$user->lastname}"]));
        }

        return $next($request);
    }
}
