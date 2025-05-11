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
     */
    public function down(): void
    {
        Schema::dropIfExists('database_notifications');
    }
};
