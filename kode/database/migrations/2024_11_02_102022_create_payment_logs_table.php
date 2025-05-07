<?php

use App\Enums\Common\PaymentStatus;
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
        Schema::create('payment_logs', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();
            $table->unsignedBigInteger('plan_id')->index();
            $table->unsignedBigInteger('gateway_id')->index()->nullable();
            $table->unsignedBigInteger('currency_id')->index()->nullable();
            $table->string('trx_code',200)->index()->unique();
            $table->integer('total_employee')->default(0);
            $table->double('base_amount', 20, 5)->default(0.0000);
            $table->double('amount', 20, 5)->default(0.0000);
            $table->double('base_charge', 20, 5)->default(0.0000);
            $table->double('charge', 20, 5)->default(0.0000);
            $table->double('base_rate', 20, 5)->default(0.0000);
            $table->double('rate', 20, 5)->default(0.0000);
            $table->double('base_final_amount', 20, 5)->default(0.0000);
            $table->double('final_amount', 20, 5)->default(0.0000);
            $table->longtext('custom_data')->nullable();
            $table->longtext('tax_configuration')->nullable();
            $table->text('remark')->nullable();
            $table->longtext('gateway_response')->nullable();
            $table->enum('payment_status',PaymentStatus::getValues());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_logs');
    }
};
