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
        Schema::create('company_departments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->index();    
            $table->unsignedBigInteger('department_id')->index();   
            $table->double('regular_rate', 20, 8)->default(0);
            $table->longText('special_rate')->nullable();   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_departments');
    }
};
