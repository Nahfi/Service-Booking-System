<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{  /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_conversation_preferences', function (Blueprint $table) {

            $table->id();

            $table->unsignedBigInteger('user_conversation_id')
                            ->index()
                            ->constrained(table: 'user_conversations');

            $table->unsignedBigInteger('user_id')
                             ->index()
                             ->constrained(table: 'users');

            $table->boolean('is_blocked')->default(false);
            $table->boolean('is_muted')->default(false);

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
        Schema::dropIfExists('user_conversation_preferences');
    }
};
