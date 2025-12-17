<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name_fa', 'name_en', 'name_ar', 'name_fr', 'image'];

    public function products()
    {
        return $this::hasMany(Product::class);
    }
}