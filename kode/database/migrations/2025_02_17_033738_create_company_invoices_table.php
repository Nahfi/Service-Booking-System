<?php

use App\Enums\Business\CompanyInvoiceStatus;
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
        Schema::create('company_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->unsignedBigInteger('bo_id')->index();    
            $table->unsignedBigInteger('company_id')->index();    
            $table->string('invoice_number', 100)->index()->unique();
            $table->timestamp('invoice_date')->nullable();
            $table->timestamp('expiry_date')->nullable();
            $table->longtext('data')->nullable();
            $table->text('note')->nullable();
            $table->enum('status', CompanyInvoiceStatus::getValues())->default(CompanyInvoiceStatus::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_invoices');
    }
};
