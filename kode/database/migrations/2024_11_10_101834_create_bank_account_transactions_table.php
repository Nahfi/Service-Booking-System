<?php

use App\Enums\Common\CreditType;
use App\Enums\Common\ExpenseTransactionType;
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
        Schema::create('bank_account_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('location_id')->nullable();
            $table->unsignedBigInteger('bo_id')->nullable();
            $table->unsignedBigInteger('currency_id')->index()->nullable();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->string('trx_code',200)->index()->unique();
            $table->double('amount', 25, 5)->default(0.0000);
            $table->double('post_amount', 25, 5)->default(0.0000);
            $table->enum('credit_type',CreditType::getValues());
            $table->enum('type',ExpenseTransactionType::getValues())->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_account_transactions');
    }
};
