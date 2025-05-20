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
        Schema::table('users', function (Blueprint $table) {

            $table->after('password', function (Blueprint $table) {
                $table->longText('recovery_codes')->nullable();
                $table->boolean('two_factor_enabled')->default(false);
                $table->timestamp('two_factor_confirmed_at')->nullable();
            });

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
           $table->dropColumn([
                'recovery_codes',
                'two_factor_enabled',
                'two_factor_confirmed_at'
            ]);
        });
    }
};
