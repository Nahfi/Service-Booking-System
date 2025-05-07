<?php

use App\Enums\Common\AffiliateInvoiceStatus;
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
        Schema::create('affiliate_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('affiliate_admin_id')->nullable();
            $table->string('invoice_number', 100)->index()->unique();
            $table->timestamp('generated_at')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->longtext('tax_configuration')->nullable();
            $table->string('billing_address')->nullable();
            $table->longtext('commission_log_ids')->nullable();
            $table->enum('status', AffiliateInvoiceStatus::getValues());
            $table->text('affiliate_note')->nullable();
            $table->text('admin_note')->nullable();
            $table->double('amount', 20, 5)->default(0.0000);
            $table->double('final_amount', 20, 5)->default(0.0000);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_invoices');
    }
};
