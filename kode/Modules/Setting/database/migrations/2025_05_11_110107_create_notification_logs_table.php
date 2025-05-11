<?php

use App\Enums\Settings\NotificationLogStatus;
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
        Schema::create('notification_logs', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('user_id')->index()->nullable()->constrained(table: 'users');
            $table->unsignedBigInteger('gateway_id')->nullable()->constrained(table: 'settings');
            $table->string('sender_model')->nullable();
            $table->unsignedBigInteger('sender_id')->nullable();
            $table->string('receiver_model')->nullable();
            $table->unsignedBigInteger('receiver_id')->nullable();
            $table->longText('custom_data')->nullable();
            $table->longText('message')->nullable();
            $table->longText('gateway_response')->nullable();
            $table->enum('status',NotificationLogStatus::getValues())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_logs');
    }
};
