<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('open_shifts', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->index()->nullable()->after('currency_id');
        });
    }

    public function down(): void
    {
        Schema::table('open_shifts', function (Blueprint $table) {
            $table->dropColumn('company_id');
        });
    }
};
