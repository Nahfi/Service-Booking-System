<?php

use App\Enums\Common\PayrollType;
use App\Enums\Common\PayrollStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Enums\Common\InvoicePayPeriodType;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('currency_id')->index();
            $table->unsignedBigInteger('location_id')->index();
            $table->string('trx_code')->nullable();
            $table->enum('type',PayrollType::getValues())->default(PayrollType::BASIC);
            $table->longtext('payroll_data')->nullable();
            $table->longtext('allowance_data')->nullable();
            $table->longtext('extra_earning_data')->nullable();
            $table->longtext('deduction_data')->nullable();
            $table->longtext('requested_data')->nullable();
            $table->longtext('tax_configuration')->nullable();
            $table->double('gross_salary', 20, 8)->default(0);
            $table->double('net_salary', 20, 8)->default(0);
            $table->enum('pay_period',InvoicePayPeriodType::getValues())->nullable();
            $table->enum('status',PayrollStatus::getValues())->default(PayrollStatus::PENDING);
            $table->timestamp('due_date')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('generated_at')->nullable(); 
            $table->timestamp('next_payroll_date')->nullable(); 
            $table->text('address')->nullable();
            $table->text('business_note')->nullable();
            $table->text('employee_note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
