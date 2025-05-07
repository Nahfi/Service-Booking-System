<?php

use App\Enums\Settings\Business\AssetStatusEnum;
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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index();
            $table->string('name',200)->index();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('location_id')->nullable()->index();
            $table->unsignedBigInteger('employee_id')->nullable()->index();
            $table->string('serial_number', 200)->index();
            $table->double('value',25,5)->default(0.00000);
            $table->longText('description')->nullable();
            $table->enum('status',AssetStatusEnum::getValues());
            $table->timestamp('lent_date')->nullable();
            $table->timestamp('return_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
