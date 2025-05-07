<?php

use App\Enums\Common\PaymentStatus;
use App\Enums\Common\SubscriptionStatus;
use App\Enums\Common\SubscriptionType;
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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->string('invoice_number',191)->index()->nullable();
            $table->unsignedBigInteger('admin_id')->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('plan_id')->index();
            $table->unsignedBigInteger('old_plan_id')->index()->nullable();
            $table->unsignedBigInteger('payment_gateway_id')->index()->nullable();
            $table->unsignedBigInteger('payment_id')->index()->nullable();
            $table->integer('total_employee')->default(0);
            $table->integer('trial_limit')->nullable()->default(null);
            $table->timestamp('expired_date')->nullable();
            $table->double('payment_amount', 25, 5)->default(0.0000);
            $table->string('billing_address',255)->nullable();
            $table->longText('remark')->nullable();
            $table->enum('status',SubscriptionStatus::getValues());
            $table->enum('payment_status',PaymentStatus::getValues())->nullable();
            $table->enum('type',SubscriptionType::getValues())->nullable();
            $table->boolean('is_affiliate')->default(false);
            $table->boolean('is_bonus')->default(false);
            $table->boolean('is_trial')->default(false);
            $table->boolean('pay_later')->default(false);
            $table->boolean('is_reminded')->default(false);
            $table->longText('employee_allocation')->nullable();
            $table->longText('location_allocation')->nullable();
            $table->longText('feature_allocation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
