<?php

use App\Enums\Common\CreditType;
use App\Enums\Common\TransactionType;
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
        Schema::create('transaction_logs', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index()->nullable();
            $table->unsignedBigInteger('affiliate_admin_id')->index()->nullable();
            $table->unsignedBigInteger('currency_id')->index()->nullable();
            $table->unsignedBigInteger('payment_id')->index()->nullable();
            $table->enum('type',TransactionType::getValues())->nullable();
            $table->double('amount', 20,5)->default(0.0000);
            $table->double('charge',25,5)->nullable()->default(0.00000);
            $table->double('final_amount',25,5)->default(0.00000);
            $table->string('trx_code',255)->index();
            $table->string('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_logs');
    }
};
