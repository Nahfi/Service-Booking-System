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
        Schema::create('attendance_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attendance_id')->index()->nullable(); 
            $table->unsignedBigInteger('location_id')->index()->nullable(); 

            $table->unsignedBigInteger('shift_id')->index()->nullable(); 

            $table->unsignedBigInteger('payroll_id')->index()->nullable(); 
            $table->longText('access_point_data')->nullable(); 

            $table->dateTime('original_clock_in')->nullable();
            $table->dateTime('clock_in')->nullable();
            $table->dateTime('clock_out')->nullable();
            
            $table->longText('deductions')->nullable();
            $table->longText('earnings')->nullable();
            $table->double('working_hours', 20, 8)->default(0);
            $table->double('pre_midnight_hours', 20, 8)->default(0);
            $table->double('post_midnight_hours', 20, 8)->default(0);
            $table->double('shift_hours', 20, 8)->default(0);
            $table->double('overtime_hours', 20, 8)->default(0);
            $table->boolean('is_overtime_shift')->default(false);

            $table->boolean('is_late')->default(false);
            $table->boolean('is_employee')->default(false);
            $table->boolean('is_payroll_generated')->default(false);
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
