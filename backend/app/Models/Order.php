<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    protected $fillable = ['table_id', 'phone_number', 'total_amount', 'items', 'status'];
    protected $casts = ['items' => 'array'];
}