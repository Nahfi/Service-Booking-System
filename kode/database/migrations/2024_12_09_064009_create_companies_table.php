<?php

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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index()->nullable();
            $table->unsignedBigInteger('location_id')->index()->nullable();
            $table->string('name', 191)->index();
            $table->string('email', 191)->nullable();
            $table->string('phone', 191)->nullable();
            $table->longtext('contact_person_info')->nullable();
            $table->longtext('address')->nullable();
            $table->unsignedInteger('max_employees_per_day')->nullable();
            $table->longText('meta_data')->nullable(); 
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
