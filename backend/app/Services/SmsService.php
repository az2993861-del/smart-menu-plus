<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class SmsService
{
    public static function sendOtp($phone, $code)
    {
        // اینجا در آینده کد اتصال به پنل پیامک قرار می‌گیره
        // فعلاً کد رو توی لاگ‌های لاراول چاپ می‌کنیم که هزینه‌ای ندی
        Log::info("SMS Sent to $phone: Your code is $code");
        
        // نمونه کد برای وقتی که پنل خریدی (مثلاً کاوه‌نگار):
        /*
        $client = new \GuzzleHttp\Client();
        $client->get("https://api.kavenegar.com/v1/YOUR_API_KEY/verify/lookup.json?receptor=$phone&token=$code&template=verify");
        */

        return true;
    }
}