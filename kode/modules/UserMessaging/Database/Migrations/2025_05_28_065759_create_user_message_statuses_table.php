<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Modules\UserMessaging\Enums\TickStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_message_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('message_id')->index()->constrained(table: 'user_messages');
            $table->unsignedBigInteger('user_id')->index()->constrained(table: 'users');
            $table->boolean('is_read')->default(false);
            $table->enum('status',TickStatus::getValues())->default(TickStatus::SENT);
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
        Schema::dropIfExists('user_message_statuses');
    }
};
