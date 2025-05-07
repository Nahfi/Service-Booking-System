<?php

use App\Enums\Common\TaskStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('task_assignments', function (Blueprint $table) {
            $table->enum('status', TaskStatus::getValues())->default(TaskStatus::PENDING->value)->change();
        });
    }

    public function down(): void
    {
        Schema::table('task_assignments', function (Blueprint $table) {
            $table->enum('status', ['pending', 'assigned', 'requested', 'completed', 'rejected'])->default('pending')->change();
        });
    }
};
