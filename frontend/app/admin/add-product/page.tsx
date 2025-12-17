"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [nameFa, setNameFa] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/products/add",
        {
          name_fa: nameFa,
          price: price,
          category_id: categoryId,
        },
        {
          headers: {
            "X-Admin-Key": "Mehdi_Special_Key_2025", // همون کلید امنیتی که ساختیم
          },
        }
      );
      setMessage("با موفقیت ثبت و ترجمه شد: " + response.data.product.name_en);
    } catch (error) {
      setMessage("خطا در اتصال به سرور!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">افزودن غذای جدید</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">نام فارسی غذا</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50 focus:ring-orange-500"
              value={nameFa}
              onChange={(e) => setNameFa(e.target.value)}
              placeholder="مثلاً: کباب کوبیده"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">قیمت (تومان)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-gray-50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            ثبت در منوی ۴ زبانه
          </button>
        </form>
        {message && <p className="mt-4 text-center text-blue-600 font-semibold">{message}</p>}
      </div>
    </div>
  );
}