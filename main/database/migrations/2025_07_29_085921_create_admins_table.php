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
        Schema::create('admins', function (Blueprint $table) {

            $table->id();
            $table->string('name',100)->index()->nullable();
            $table->string('username',100)->unique()->index();
            $table->string('phone',100)->unique()->index();
            $table->string('email')->unique()->index();
            $table->string('password');
            $table->timestamp('last_login_time')->nullable();
            $table->rememberToken();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
