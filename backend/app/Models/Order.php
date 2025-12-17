<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['table_id', 'phone_number', 'total_amount', 'status', 'items'];

    // چون آیتم‌ها به صورت آرایه (JSON) ذخیره میشن، این خط مهمه
    protected $casts = [
        'items' => 'array',
    ];

    public function table()
    {
        return $this::belongsTo(Table::class);
    }
}