<?php

use App\Enums\Common\Admin\Custom\AppliedOnType;
use App\Enums\Common\Admin\Custom\TypeEnum;
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
        Schema::create('custom_information', function (Blueprint $table) {
            $table->id();
            $table->enum('applied_on',AppliedOnType::getValues())->nullable();
            $table->enum('type',TypeEnum::getValues())->nullable();
            $table->string('country_name', 191)->nullable();
            $table->longText('data')->nullable();
            $table->boolean('is_default')->default(false);
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_information');
    }
};
