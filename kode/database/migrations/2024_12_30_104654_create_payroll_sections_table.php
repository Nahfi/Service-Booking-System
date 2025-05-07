<?php

use App\Enums\Common\PayslipColumn;
use App\Enums\Common\PayslipSection;
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
        Schema::create('payroll_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('payroll_section_column_id')->nullable()->index();
            $table->enum('type', PayslipSection::getValues())->default(PayslipSection::ADDITIONAL_INFO);
            $table->string('key', 191);
            $table->string('display_name', 191)->nullable();
            $table->string('value', 191)->nullable();
            $table->boolean('is_default')->default(false);
            $table->boolean('is_dynamic')->default(true);
            $table->unsignedInteger('item_order')->nullable()->index(); 
            $table->enum('status', Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_sections');
    }
};
