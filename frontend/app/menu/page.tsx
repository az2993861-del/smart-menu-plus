"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function GuestMenu() {
  const [products, setProducts] = useState([]);
  const { addToCart, cart, totalPrice } = useCart();

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("خطا در دریافت محصولات"));
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-4 pb-24" dir="rtl">
      <h1 className="text-3xl font-black text-center text-orange-600 py-6">منوی رستوران</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {products.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden p-4">
            <img src={`http://localhost:8000/${item.image}`} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h2 className="text-xl font-bold">{item.name_fa}</h2>
            <p className="text-orange-500 font-bold mt-2">{Number(item.price).toLocaleString()} تومان</p>
            <button onClick={() => addToCart(item)} className="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl">افزودن به سبد</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-80 bg-orange-600 text-white p-4 rounded-3xl flex justify-between items-center shadow-2xl">
          <span>{totalPrice.toLocaleString()} تومان</span>
          <Link href="/checkout" className="bg-white text-orange-600 px-4 py-1 rounded-lg font-bold">تایید سفارش</Link>
        </div>
      )}
    </div>
  );
}