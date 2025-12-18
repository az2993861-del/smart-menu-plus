"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: دریافت موبایل، 2: تایید کد
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // تایمر ۱۲۰ ثانیه‌ای

  // مدیریت تایمر معکوس
  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // مرحله اول: ارسال کد تایید
  const handleSendOtp = async () => {
    if (phone.length !== 11) return alert("شماره موبایل باید ۱۱ رقم باشد");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/orders/send-otp", { phone_number: phone });
      alert("کد تایید شما (برای تست): " + res.data.code);
      setStep(2);
      setTimer(120); // ریست تایمر
    } catch (err: any) {
      alert("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  // مرحله دوم: تایید نهایی و ثبت سفارش
  const handleVerifyAndSubmit = async () => {
    if (otp.length < 4) return alert("کد تایید را وارد کنید");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/orders/verify-and-submit", {
        phone_number: phone,
        otp_code: otp,
        total_amount: totalPrice,
        items: cart,
        table_id: 1, // آی‌دی میزی که در دیتابیس ساختی
      });
      
      // انتقال به صفحه موفقیت با آی‌دی سفارش
      router.push(`/success/${res.data.order_id}`);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "کد وارد شده اشتباه است";
      alert("خطا: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 flex flex-col items-center justify-center" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 border border-orange-100">
        <h1 className="text-2xl font-black text-gray-800 mb-2">نهایی کردن سفارش</h1>
        <p className="text-gray-500 text-sm mb-8">تقریباً تمومه! فقط شماره‌ت رو تایید کن.</p>

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">شماره موبایل</label>
              <input
                type="tel"
                placeholder="09123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-orange-500 focus:bg-white outline-none text-center text-xl font-bold transition-all"
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-orange-200 transition-all active:scale-95"
            >
              {loading ? "در حال ارسال..." : "دریافت کد تایید"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 mr-2">کد ۴ رقمی ارسال شده</label>
              <input
                type="text"
                placeholder="* * * *"
                value={otp}
                maxLength={4}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-green-500 focus:bg-white outline-none text-center text-3xl font-black tracking-[15px] transition-all"
              />
            </div>

            <button
              onClick={handleVerifyAndSubmit}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              {loading ? "در حال تایید..." : "تایید نهایی و ثبت"}
            </button>

            <div className="text-center mt-4">
              {timer > 0 ? (
                <p className="text-gray-400 text-sm">ارسال مجدد کد تا <span className="text-orange-500 font-bold">{timer}</span> ثانیه دیگر</p>
              ) : (
                <button onClick={handleSendOtp} className="text-orange-600 font-bold text-sm underline">ارسال مجدد کد تایید</button>
              )}
            </div>
            
            <button onClick={() => setStep(1)} className="w-full text-gray-400 text-xs hover:text-gray-600">تغییر شماره موبایل</button>
          </div>
        )}
      </div>

      {/* نمایش خلاصه فاکتور در پایین */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">مبلغ قابل پرداخت:</p>
        <p className="text-xl font-black text-gray-800">{totalPrice.toLocaleString()} تومان</p>
      </div>
    </div>
  );
}