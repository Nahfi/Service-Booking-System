<?php

use App\Enums\Common\EmployeeJobType;
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
        Schema::create('payroll_presets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->string('name', 191);
            $table->enum('employee_job_type',EmployeeJobType::getValues())->nullable();
            $table->boolean('is_default')->default(false);
            $table->double('weekly_work_hour', 20, 8)->nullable();
            $table->double('wage', 20, 8)->nullable();
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_presets');
    }
};
