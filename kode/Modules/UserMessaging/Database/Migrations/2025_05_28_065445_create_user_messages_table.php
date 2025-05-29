<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('conversation_id')->index()->constrained(table:'user_conversations');
            $table->unsignedBigInteger('sender_id')->index()->constrained(table: 'users');
            $table->unsignedBigInteger('reply_to_id')->index()->nullable()->constrained('user_messages');
            $table->text('content');
            $table->boolean('deleted_by_sender')->default(false);
            $table->boolean('deleted_by_receiver')->default(false);
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
        Schema::dropIfExists('user_messages');
    }
}
