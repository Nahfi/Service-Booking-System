<?php

use App\Enums\Common\PayslipColumn;
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
        Schema::create('payroll_section_columns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index(); 
            $table->enum('payslip_column', PayslipColumn::getValues());
            $table->unsignedInteger('section_order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_section_columns');
    }
};
