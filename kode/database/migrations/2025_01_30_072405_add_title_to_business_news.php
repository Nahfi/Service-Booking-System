<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_news', function (Blueprint $table) {
            $table->string('title', 191)->nullable()->after('publisher_id');
        });
    }

    public function down(): void
    {
        Schema::table('business_news', function (Blueprint $table) {
            $table->dropColumn('title');
        });
    }
};
