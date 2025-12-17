<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// کد پیش‌فرض لاراول (بمونه بهتره)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// --- بخش اختصاصی مهدی ---

// گروه مسیرهای مدیریت که امنیتشون با اون نگهبان (Middleware) تامین میشه
Route::middleware('secret.admin')->group(function () {
    
    // مسیر ثبت محصول جدید (با ترجمه خودکار)
    Route::post('/admin/products/add', [ProductController::class, 'store']);
    
    // اینجا بعداً مسیرهای ویرایش و حذف رو هم اضافه می‌کنیم
});