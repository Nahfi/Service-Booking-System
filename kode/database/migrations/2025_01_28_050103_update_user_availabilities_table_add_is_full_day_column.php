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
        Schema::table('user_availabilities', function (Blueprint $table) {
            $table->boolean('is_full_day')->default(false)->after('shift_setting_id');
            $table->unsignedBigInteger('shift_setting_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_availabilities', function (Blueprint $table) {
            $table->dropColumn('is_full_day');
            $table->unsignedBigInteger('shift_setting_id')->nullable(false)->change();
        });
    }
};
