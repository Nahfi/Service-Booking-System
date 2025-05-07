<?php

use App\Enums\Common\DisputeStatus;
use App\Enums\Common\Status;
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
        Schema::create('dispute_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index()->nullable(); 
            $table->unsignedBigInteger('user_id')->index()->nullable(); 
            $table->unsignedBigInteger('shift_id')->index()->nullable(); 
            $table->time('clock_in')->nullable();
            $table->text('note')->nullable();
            $table->enum('status',DisputeStatus::getValues())->default(DisputeStatus::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dispute_requests');
    }
};
