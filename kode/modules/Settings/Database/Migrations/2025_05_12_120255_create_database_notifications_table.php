<?php

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
        Schema::create('database_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('receiver_model')->nullable();
            $table->unsignedBigInteger('reciever_id')->index()->nullable();
            $table->text('message')->nullable();
            $table->longText('payload')->nullable();
            $table->boolean('is_read')->default(false);
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
        Schema::dropIfExists('database_notifications');
    }
};
