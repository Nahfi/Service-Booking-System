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
        Schema::create('payroll_period_presets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index()->nullable();
            $table->string('name');
            $table->string('start_month_day'); 
            $table->string('end_month_day');   
            $table->string('weeks');
            $table->string('pay_month_day'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_period_presets');
    }
};
