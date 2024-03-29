<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{

    // public function handle($request, $next)
    // {
    //     dd(Auth::user() );
    //     // // Modify the handle method to use auth:api middleware for API requests
    //     if (Auth::user() === null) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     return $next($request);
    // }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }

    }
}
