<?php

use App\Enums\Common\AllowanceType;
use App\Enums\Common\ForwardStatus;
use App\Enums\Common\ShiftStatus;
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
        Schema::create('open_shifts', function (Blueprint $table) {
            $table->id(); 
            $table->string('uid',100)->index()->nullable(); 
            $table->unsignedBigInteger('bo_id')->index();    
            $table->unsignedBigInteger('shift_setting_id')->index(); 
            $table->bigInteger('shift_count')->index()->nullable();
            $table->unsignedBigInteger('department_id')->index(); 
            $table->unsignedBigInteger('location_id')->index()->nullable(); 
            $table->unsignedBigInteger('currency_id')->index(); 

            $table->enum('shift_status',ShiftStatus::getValues())->default(ShiftStatus::PENDING);
            $table->boolean('is_published')->default(false);

            $table->longText('bonus_configuration')->nullable(); 
            $table->enum('allowance_status',Status::getValues())->default(Status::INACTIVE)->nullable(); 
            $table->enum('allowance_type',AllowanceType::getValues())->nullable(); 
            $table->double('allowance_amount', 25, 5)->default(0.0000)->nullable(); 

            $table->timestamp('generated_at')->nullable(); 
            $table->timestamp('published_at')->nullable(); 

            $table->longText('meta_data')->nullable(); 
            $table->string('color', 191)->nullable();
            $table->text('note')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('open_shifts');
    }
};
