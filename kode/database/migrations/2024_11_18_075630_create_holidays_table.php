<?php

use App\Enums\Common\Status;
use App\Enums\Common\EmployeeJobType;
use App\Enums\Common\HolidayType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('holidays', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();
            $table->string('name');
            $table->boolean('is_default')->default(false);
            $table->timestamp('date')->nullable();
            $table->text('occasion')->nullable();
            $table->enum('type',HolidayType::getValues())->default(HolidayType::REGULAR);
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('holidays');
    }
};
