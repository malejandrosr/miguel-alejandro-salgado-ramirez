<?php

use App\Http\Controllers\Api\Auth\AuthenticateController;
use App\Http\Controllers\Api\BanxicoController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PublicProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::controller(AuthenticateController::class)->group(function () {
            Route::post('/login', 'login');
        });
    });

    Route::prefix('banxico')->group(function () {
        Route::controller(BanxicoController::class)->group(function () {
            Route::get('/', 'index');
        });
    });

    Route::prefix('products')->group(function () {
        Route::controller(PublicProductController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('/{url}', 'show');
        });
    });
});

Route::middleware('auth:api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::controller(AuthenticateController::class)->group(function () {
            Route::get('/logout', 'logout');
        });
    });

    Route::patch('/users/{user}/disable', [UserController::class, 'disable']);
    Route::apiResource('users', UserController::class);

    Route::patch('/admin/products/{product}/disable', [ProductController::class, 'disable']);
    Route::apiResource('admin/products', ProductController::class);
});
