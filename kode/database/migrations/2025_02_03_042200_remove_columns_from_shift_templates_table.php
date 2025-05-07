<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('shift_templates', function (Blueprint $table) {
            $table->dropColumn(['shift_setting_id', 'department_id', 'num_of_employees', 'color']);
        });
    }

    public function down()
    {
        Schema::table('shift_templates', function (Blueprint $table) {
            $table->unsignedBigInteger('shift_setting_id')->index()->nullable();
            $table->unsignedBigInteger('department_id')->index()->nullable();
            $table->unsignedInteger('num_of_employees')->nullable();
            $table->string('color', 191)->nullable(); 
        });
    }
};
