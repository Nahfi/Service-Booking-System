<?php

use App\Enums\Settings\Business\PayrollDeductionEnum;
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
        Schema::create('payroll_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('user_id')->index()->nullable(); 
            $table->enum('type',PayrollDeductionEnum::getValues());
            $table->double('gross_salary', 20, 8)->default(0);
            $table->double('amount', 20, 8)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_transactions');
    }
};
