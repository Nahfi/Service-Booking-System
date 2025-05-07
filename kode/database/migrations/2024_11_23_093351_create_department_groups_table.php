<?php

use App\Enums\Common\Status;
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
        Schema::create('department_groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index();    
            $table->unsignedBigInteger('manager_id')->index();    
            $table->unsignedBigInteger('location_id')->nullable()->index();    
            $table->string('name', 191)->index();
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_groups');
    }
};
