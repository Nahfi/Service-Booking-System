<?php

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
        Schema::create('affiliate_commission_logs', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('affiliate_admin_id')->index()->nullable();
            $table->unsignedBigInteger('subscription_id')->nullable();
            $table->longtext( 'commission')->nullable();
            $table->longtext('tax_configuration')->nullable();
            $table->double('amount', 20, 5)->default(0.0000);
            $table->double('final_amount', 20, 5)->default(0.0000);
            $table->text('remark')->nullable();
            $table->boolean('is_invoiced')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_commission_logs');
    }
};
