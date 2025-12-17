<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Stichoza\GoogleTranslate\GoogleTranslate;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        // ۱. اعتبارسنجی ورودی‌ها
        $request->validate([
            'name_fa' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $data = $request->all();

        // ۲. ترجمه خودکار (هوشمند)
        $tr = new GoogleTranslate();
        
        $data['name_en'] = $tr->setSource('fa')->setTarget('en')->translate($request->name_fa);
        $data['name_ar'] = $tr->setSource('fa')->setTarget('ar')->translate($request->name_fa);
        $data['name_fr'] = $tr->setSource('fa')->setTarget('fr')->translate($request->name_fa);

        // ۳. آپلود عکس (اگر ارسال شده باشد)
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/products'), $imageName);
            $data['image'] = 'images/products/' . $imageName;
        }

        // ۴. ذخیره در دیتابیس
        $product = Product::create($data);

        return response()->json([
            'message' => 'غذا با موفقیت ثبت و ترجمه شد!',
            'product' => $product
        ], 201);
    }
}