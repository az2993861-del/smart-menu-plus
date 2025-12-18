"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SuccessPage() {
  const params = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6" dir="rtl">
      {/* آیکون تیک سبز */}
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">
        ✓
      </div>

      <h1 className="text-3xl font-black text-gray-800 mb-2">نوش جان، مهدی!</h1>
      <p className="text-gray-500 text-lg">سفارش شما با موفقیت ثبت شد.</p>
      
      <div className="mt-8 p-6 bg-orange-50 rounded-[2rem] w-full max-w-sm text-center border border-orange-100">
        <p className="text-gray-400 text-sm mb-1">شماره پیگیری سفارش:</p>
        <p className="text-3xl font-black text-orange-600">{params.id}</p>
      </div>

      <p className="mt-6 text-gray-400 text-center max-w-xs">
        آشپزخانه در حال آماده‌سازی سفارش شماست. بزودی روی میزتان خواهد بود!
      </p>

      <Link href="/menu" className="mt-12 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">
        برگشت به منو
      </Link>
    </div>
  );
}