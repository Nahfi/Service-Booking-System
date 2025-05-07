<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('holidays', function (Blueprint $table) {
            
            $table->longText('conditions')->nullable()->after('occasion');
            DB::statement("ALTER TABLE holidays CHANGE COLUMN type type ENUM('regular', 'bank_holiday', 'special_holiday') NOT NULL DEFAULT 'regular'");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('holidays', function (Blueprint $table) {
            
            $table->dropColumn('conditions');
        });

        DB::statement("ALTER TABLE holidays CHANGE COLUMN type type ENUM('regular', 'bank_holiday') NOT NULL DEFAULT 'regular'");
    }
};
