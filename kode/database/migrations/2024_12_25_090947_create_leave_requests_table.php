<?php

use App\Enums\Common\LeaveStatus;
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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('leave_type_id')->index();
            $table->unsignedBigInteger('payroll_id')->index()->nullable(); 
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->double('total_hours', 25, 5)->nullable();
            $table->boolean('is_paid')->default(false);
            $table->text('reason')->nullable();
            $table->enum('status',LeaveStatus::getValues())->default(LeaveStatus::PENDING);
            $table->boolean('is_payroll_generated')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
