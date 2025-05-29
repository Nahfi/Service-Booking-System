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
            $table->unsignedBigInteger('parent_id')->nullable()->constrained(table: 'users');
            $table->unsignedBigInteger('role_id')->nullable()->constrained(table: 'roles');
            $table->longText('fcm_token')->nullable();
            $table->string('name', 191);
            $table->string('email',191)->index();
            $table->string('phone',100)->nullable()->index();
            $table->longText('meta_data')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->text('address')->nullable();
            $table->text('google2fa_secret')->nullable();
            $table->string('password');
            $table->string('visible_password')->nullable();
            $table->timestamp('last_login_time')->nullable();
            $table->boolean('show_online_status')->default(true);
            $table->enum('status',Status::getValues());
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
