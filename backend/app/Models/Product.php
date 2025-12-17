<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'name_fa', 'name_en', 'name_ar', 'name_fr', 
        'description_fa', 'price', 'discount_price', 
        'is_available', 'is_special', 'image'
    ];

    public function category()
    {
        return $this::belongsTo(Category::class);
    }
}