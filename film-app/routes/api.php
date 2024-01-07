<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['cors', 'json.response', 'throttle:20,1']], function () {

Route::post('/register', [UserController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{id}',  [FilmController::class, 'getOneFilm']);

Route::middleware(['auth:api'])->group( function () {
    Route::post('/film/{id}',  [FilmController::class, 'rate']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

});
