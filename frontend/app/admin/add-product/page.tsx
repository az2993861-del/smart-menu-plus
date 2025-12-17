"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [nameFa, setNameFa] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name_fa", nameFa);
    formData.append("price", price);
    formData.append("category_id", "1"); // آی‌دی پیتزا که قبلاً با هم ساختیم
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8000/api/admin/products/add", formData, {
        headers: { 
            "X-Admin-Key": "Mehdi_Special_Key_2025",
            "Content-Type": "multipart/form-data" 
        },
      });
      setMessage("ایول! غذا با موفقیت و عکس ذخیره شد.");
    } catch (err) {
      setMessage("خطا در ارسال اطلاعات! مطمئن شو لاراول روشنه.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-700">افزودن غذای جدید</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div>
            <label className="block text-sm mb-1">نام غذا (فارسی)</label>
            <input type="text" className="w-full p-2 border rounded-lg" onChange={(e) => setNameFa(e.target.value)} placeholder="مثلاً پیتزا سیر و استیک" />
          </div>
          <div>
            <label className="block text-sm mb-1">قیمت (تومان)</label>
            <input type="number" className="w-full p-2 border rounded-lg" onChange={(e) => setPrice(e.target.value)} placeholder="280000" />
          </div>
          <div>
            <label className="block text-sm mb-1">عکس غذا</label>
            <input type="file" className="w-full text-sm" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>
          <button className="w-full bg-orange-500 text-white p-3 rounded-lg font-bold hover:bg-orange-600 transition">
            {loading ? "در حال آپلود..." : "ثبت در منوی هوشمند"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium text-blue-600">{message}</p>}
      </div>
    </div>
  );
}