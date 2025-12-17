<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Stichoza\GoogleTranslate\GoogleTranslate;

class ProductController extends Controller
{
    public function store(Request $request)
{
    $data = $request->all();

    // ترجمه خودکار
    $tr = new \Stichoza\GoogleTranslate\GoogleTranslate();
    $data['name_en'] = $tr->setSource('fa')->setTarget('en')->translate($request->name_fa);
    $data['name_ar'] = $tr->setSource('fa')->setTarget('ar')->translate($request->name_fa);
    $data['name_fr'] = $tr->setSource('fa')->setTarget('fr')->translate($request->name_fa);

    // آپلود عکس
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads/products'), $filename);
        $data['image'] = 'uploads/products/' . $filename;
    }

    $product = \App\Models\Product::create($data);

    return response()->json(['message' => 'ذخیره شد!', 'product' => $product]);
}
}