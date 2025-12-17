<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecretAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // اینجا یه کلید سخت انتخاب می‌کنیم. مثلا: Mehdi_Special_Key_2025
        if ($request->header('X-Admin-Key') !== 'Mehdi_Special_Key_2025') {
            return response()->json(['message' => 'شما اجازه ورود ندارید!'], 403);
        }
        return $next($request);
    }
}