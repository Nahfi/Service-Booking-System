<?php

use App\Enums\Common\AvailabilityStatus;
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
        Schema::create('user_availabilities', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->unsignedBigInteger('location_id')->index();
            $table->unsignedBigInteger('shift_setting_id')->index();
            $table->timestamp('available_date')->nullable();
            $table->text('note')->nullable();
            $table->enum('status',AvailabilityStatus::getValues())->default(AvailabilityStatus::AVAILABLE->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_availabilities');
    }
};
