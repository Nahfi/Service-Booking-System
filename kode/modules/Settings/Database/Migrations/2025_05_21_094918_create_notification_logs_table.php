<?php

use App\Enums\Settings\NotificationLogStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_logs', function (Blueprint $table) {
            $table->id();
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
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification_logs');
    }
};
