<?php

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
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->nullable();
            $table->unsignedBigInteger('currency_id')->nullable();
            $table->string('account_name',191)->nullable();
            $table->string('bank_name',191)->nullable();
            $table->string('bank_account_number',191)->nullable();
            $table->string('contact_number',191)->nullable();
            $table->double('balance', 24, 5)->default(0.0000);
            $table->enum('status', Status::getValues());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
    }
};
