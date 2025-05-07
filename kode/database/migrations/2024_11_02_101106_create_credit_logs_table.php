<?php

use App\Enums\Common\CreditType;
use App\Enums\Common\ResourceAllocationType;
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
        Schema::create('credit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('subscription_id')->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();
            $table->string('trx_code',200)->index()->unique();
            $table->enum('credit_type',CreditType::getValues());
            $table->enum('type',ResourceAllocationType::getValues());
            $table->mediumInteger('balance')->default(0);
            $table->mediumInteger('post_balance')->default(0);
            $table->string('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_logs');
    }
};
