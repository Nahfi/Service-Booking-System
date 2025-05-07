<?php

use App\Enums\Common\PayPeriodEnum;
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
        Schema::create('payroll_allowances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('preset_id')->index()->nullable();
            $table->string('key', 191);
            $table->string('display_name', 191)->nullable();
            $table->longtext('employee_conditions')->nullable();
            $table->longtext('business_conditions')->nullable();
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->enum('pay_period',PayPeriodEnum::getValues())->nullable();
            $table->string('pay_month', 191)->nullable();
            $table->boolean('is_default')->default(false);
            $table->boolean('is_pay_period_disabled')->default(false);
            $table->boolean('is_applied_on_disabled')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_allowances');
    }
};
