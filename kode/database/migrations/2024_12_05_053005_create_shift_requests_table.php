<?php

use App\Enums\Common\ShiftRequestStatus;
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
        Schema::create('shift_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();    
            $table->unsignedBigInteger('employee_id')->index()->nullable(); 
            $table->unsignedBigInteger('shift_setting_id')->index(); 
            $table->enum('status',ShiftRequestStatus::getValues())->default(ShiftRequestStatus::PENDING);
            $table->text('note')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shift_requests');
    }
};
