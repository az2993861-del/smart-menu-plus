<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('table_id')->constrained();
            $table->string('phone_number');
            $table->decimal('total_amount', 15, 0);
            $table->enum('status', ['pending', 'preparing', 'delivered', 'cancelled'])->default('pending');
            $table->text('items'); // لیست غذاهای سفارش داده شده به صورت JSON
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
