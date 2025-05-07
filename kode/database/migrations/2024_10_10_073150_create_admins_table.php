<?php

use App\Enums\Common\AffiliateRegistrationStatus;
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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->longText('fcm_token')->nullable();
            $table->string('name',100)->index()->nullable();
            $table->string('username',100)->unique()->index();
            $table->string('phone',100)->unique()->index();
            $table->string('email')->unique()->index();
            $table->text('affiliate_configuration')->nullable();
            $table->text('address')->nullable();
            $table->text('google2fa_secret')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('status',Status::getValues());
            $table->double('commission_amount', 20, 8)->default(0);
            $table->double('commission_balance', 20, 8)->default(0);
            $table->boolean('is_affiliate_user')->default(false);
            $table->boolean('kyc_verified')->default(false);
            $table->enum('affiliate_registraton_status',AffiliateRegistrationStatus::getValues())->nullable();
            $table->boolean('is_super_admin')->default(false);
            $table->timestamp('last_login_time')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
