<?php

use App\Enums\Common\AllowanceType;
use App\Enums\Common\ForwardStatus;
use App\Enums\Common\ShiftStatus;
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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id(); 
            $table->string('uid',100)->index()->nullable(); 
            $table->unsignedBigInteger('parent_id')->index()->nullable(); 
            $table->unsignedBigInteger('company_id')->index()->nullable(); 
            $table->unsignedBigInteger('task_id')->index()->nullable(); 
            $table->unsignedBigInteger('bo_id')->index();    
            $table->unsignedBigInteger('department_id')->index(); 
            $table->unsignedBigInteger('employee_id')->index()->nullable(); 
            $table->unsignedBigInteger('availability_id')->index()->nullable(); 
            $table->unsignedBigInteger('location_id')->index()->nullable(); 
            $table->unsignedBigInteger('currency_id')->index(); 
            $table->unsignedBigInteger('shift_setting_id')->index(); 

            $table->enum('shift_status',ShiftStatus::getValues())->default(ShiftStatus::PENDING);
            $table->text('conflict_reason')->nullable(); 

            $table->boolean('is_open')->default(true);
            $table->boolean('is_published')->default(false);
            $table->boolean('is_backup')->default(false);
            $table->boolean('force_assign')->default(false);

            $table->longText('bonus_configuration')->nullable(); 
            $table->enum('allowance_status',Status::getValues())->default(Status::INACTIVE)->nullable(); 
            $table->enum('allowance_type',AllowanceType::getValues())->nullable(); 
            $table->double('allowance_amount', 25, 5)->default(0.0000)->nullable(); 

            $table->timestamp('generated_at')->nullable(); 
            $table->timestamp('published_at')->nullable(); 

            $table->unsignedBigInteger('forwarded_to')->index()->nullable(); 
            $table->unsignedBigInteger('forwarded_by')->index()->nullable(); 
            $table->text('forward_reason')->nullable(); 
            $table->enum('forward_status',ForwardStatus::getValues())->nullable();

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
        Schema::dropIfExists('shifts');
    }
};
