<?php

use App\Enums\Common\Status;
use App\Enums\Common\GenderEnum;
use App\Enums\Common\MaritalStatus;
use App\Enums\Common\EmployeeJobType;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('affiliate_admin_id')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->unsignedBigInteger('role_id')->nullable();
            $table->unsignedBigInteger('preset_id')->nullable();
            $table->string('employee_id',100)->unique()->index()->nullable();
            $table->enum('employee_job_type',EmployeeJobType::getValues())->nullable();
            $table->longText('fcm_token')->nullable();
            $table->string('name', 191);
            $table->string('designation', 191)->nullable();
            $table->enum('gender',GenderEnum::getValues());
            $table->enum('marital_status',MaritalStatus::getValues())->nullable();
            $table->timestamp('date_of_birth')->nullable();
            $table->string('email')->unique()->index();
            $table->string('phone',100)->nullable()->index();
            $table->longText('meta_data')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('is_verified')->default(false); 
            $table->text('address')->nullable();
            $table->timestamp('joined_at')->nullable();
            $table->text('google2fa_secret')->nullable();
            $table->string('password');
            $table->string('visible_password');
            $table->timestamp('last_login_time')->nullable();
            $table->enum('status',Status::getValues());
            $table->boolean('is_owner')->default(false); 
            $table->boolean('is_kyc_verified')->default(false);
            $table->longtext('wage')->nullable();
            $table->longtext('wallet')->nullable();
            $table->double('remaining_paid_annual_hours', 20, 8)->default(0);
            $table->date('last_reset_date')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
