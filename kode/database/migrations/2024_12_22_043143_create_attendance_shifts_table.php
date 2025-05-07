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
        Schema::create('attendance_shifts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attendance_id')->index()->nullable(); 
            $table->unsignedBigInteger('shift_id')->index()->nullable(); 
            $table->boolean('is_overtime')->default(true);
            $table->double('total_hours', 25, 5)->default(0.0000)->nullable(); 
            $table->dateTime('original_clock_in')->nullable();
            $table->dateTime('clock_in')->nullable();
            $table->dateTime('clock_out')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_shifts');
    }
};
