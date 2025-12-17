"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GuestMenu() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // گرفتن لیست غذاها از بک‌اَند
    axios.get("http://localhost:8000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log("خطا در دریافت منو"));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-4" dir="rtl">
      <header className="text-center py-6">
        <h1 className="text-3xl font-extrabold text-orange-600">منوی دیجیتال رستوران</h1>
        <p className="text-gray-500 mt-2">خوشمزه انتخاب کنید!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img 
              src={`http://localhost:8000/${item.image}`} 
              alt={item.name_fa} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{item.name_fa}</h2>
                <span className="text-orange-500 font-bold">{item.price} تومان</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{item.name_en} | {item.name_ar}</p>
              <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl font-medium">
                افزودن به سفارش
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}