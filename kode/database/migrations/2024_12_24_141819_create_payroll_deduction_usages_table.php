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
        Schema::create('payroll_deduction_usages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();  
            $table->unsignedBigInteger('user_id')->index();  
            $table->unsignedBigInteger('payroll_id')->index();  
            $table->unsignedBigInteger('deduction_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_deduction_usages');
    }
};
