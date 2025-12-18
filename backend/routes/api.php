<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Order;
use App\Services\SmsService;
use Illuminate\Support\Facades\Cache;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ۱. دریافت لیست محصولات برای منو
Route::get('/products', function () {
    return Product::all();
});

// ۲. ارسال کد تایید (OTP)
Route::post('/orders/send-otp', function (Request $request) {
    $phone = $request->phone_number;

    if (!$phone) {
        return response()->json(['message' => 'شماره موبایل الزامی است'], 400);
    }

    // تولید کد ۴ رقمی تصادفی
    $code = rand(1000, 9999); 

    // ذخیره در کش به مدت ۲ دقیقه
    Cache::put('otp_' . $phone, $code, now()->addMinutes(2));

    // ارسال پیامک (فعلاً در لاگ ذخیره می‌شود - storage/logs/laravel.log)
    SmsService::sendOtp($phone, $code);

    return response()->json([
        'message' => 'کد تایید ارسال شد',
        'code' => $code // نمایش کد برای تست در فرانت‌اَند
    ]);
});

// ۳. تایید کد و ثبت نهایی سفارش
Route::post('/orders/verify-and-submit', function (Request $request) {
    $phone = $request->phone_number;
    $userCode = $request->otp_code;
    
    // دریافت کد ذخیره شده از کش
    $savedCode = Cache::get('otp_' . $phone);

    // بررسی صحت کد
    if (!$savedCode || $savedCode != $userCode) {
        return response()->json([
            'message' => 'کد وارد شده اشتباه است یا منقضی شده'
        ], 403);
    }

    try {
        // ثبت در دیتابیس
        $order = Order::create([
            'table_id' => $request->table_id ?? 1,
            'phone_number' => $phone,
            'total_amount' => $request->total_amount,
            'items' => $request->items, // لیست آرایه محصولات
            'status' => 'pending'
        ]);

        // پاک کردن کد از کش بعد از موفقیت
        Cache::forget('otp_' . $phone);

        return response()->json([
            'message' => 'سفارش با موفقیت ثبت شد',
            'order_id' => $order->id
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'خطا در ثبت سفارش',
            'error' => $e->getMessage()
        ], 500);
    }
});

// ۴. بخش ادمین: دریافت تمام سفارش‌ها (برای مرحله بعد که پنل رو می‌سازیم)
Route::get('/admin/orders', function () {
    return Order::orderBy('created_at', 'desc')->get();
});