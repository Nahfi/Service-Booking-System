<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shift_template_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shift_template_id')->index();
            $table->unsignedBigInteger('department_id')->index();
            $table->unsignedBigInteger('shift_setting_id')->index();
            $table->unsignedInteger('num_of_employees')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shift_template_settings');
    }
};
