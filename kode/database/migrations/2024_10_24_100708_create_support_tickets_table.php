<?php

use App\Enums\Common\TicketStatus;
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
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id()->index();
            $table->string('uid',100)->index();
            $table->string('ticket_number',100)->index()->unique();
            $table->unsignedBigInteger('receiver_id')->index()->nullable();
            $table->string('causer_model')->nullable();
            $table->unsignedBigInteger('causer_id')->index()->nullable();
            $table->longText('ticket_data')->nullable();
            $table->string('subject')->nullable();
            $table->longText('message')->nullable();
            $table->enum('status',TicketStatus::getValues())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_tickets');
    }
};
