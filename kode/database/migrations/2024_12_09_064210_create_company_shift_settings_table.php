<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_shift_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('company_id')->index();    
            $table->unsignedBigInteger('department_id')->index(); 
            $table->timestamp('date')->nullable(); 
            $table->unsignedBigInteger('shift_setting_id')->index();   
            $table->unsignedInteger('num_of_employees');
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_shift_settings');
    }
};
