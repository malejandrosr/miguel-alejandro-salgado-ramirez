<?php

namespace App\Http\Controllers\ApiAdministrator\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApiAdministrator\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @group Auth Endpoints
 */
class AuthenticateController extends Controller
{
    /**
     * Handle an incoming login request.
     *
     * @unauthenticated
     *
     * @bodyParam email string required Example: superadmin@exmaple.com
     * @bodyParam password string required Example: Secret123456
     *
     * @param  \App\Http\Requests\ApiAdministrator\Auth\LoginRequest  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        /** @var \App\Models\Administrator $administrator */
        $administrator = Auth::guard('web_administrator')->user();

        return response()->json([
            'token' => $administrator->createToken('authAdministrator')->plainTextToken,
            'administrator' => $administrator,
        ]);
    }

    /**
     * Handle and incoming logout request.
     *
     * @authenticated
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web_administrator')->logout();

        /** @var \App\Models\Administrator $administrator */
        $administrator = Auth::guard('web_administrator')->user();

        return response()->json(['logout' => $administrator == null]);
    }
}
