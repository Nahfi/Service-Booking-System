<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('access_point_white_lists', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable()->index()->after('location_id');
            $table->unsignedBigInteger('location_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('access_point_white_lists', function (Blueprint $table) {
            $table->dropColumn('company_id');
            $table->unsignedBigInteger('location_id')->nullable(false)->change();
        });
    }
};
