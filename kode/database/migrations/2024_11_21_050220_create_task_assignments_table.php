<?php

use App\Enums\Common\TaskStatus;
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
        Schema::create('task_assignments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id')->index(); 
            $table->unsignedBigInteger('employee_id')->index(); 
            $table->unsignedBigInteger('shift_id')->index()->nullable(); 
            $table->enum('status',TaskStatus::getValues())->default(TaskStatus::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_assignments');
    }
};
