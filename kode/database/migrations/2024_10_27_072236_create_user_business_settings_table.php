<?php

use App\Enums\Common\BusinessType;
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
        Schema::create('user_business_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('business_id',100)->unique()->index()->nullable();
            $table->unsignedBigInteger('bo_category_id')->nullable();
            $table->unsignedBigInteger('currency_id')->nullable();
            $table->unsignedBigInteger('language_id')->nullable();
            $table->unsignedInteger('total_employee')->nullable();
            $table->string('business_name',191)->nullable();
            $table->string('kvk_number',191)->nullable();
            $table->string('btw_number',191)->nullable();
            $table->string('ibna_number',191)->nullable();
            $table->enum('type',BusinessType::getValues())->nullable();
            $table->longText('country')->nullable();
            $table->string('time_zone',150)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_business_settings');
    }
};
