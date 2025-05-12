<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
         $table->id();
            $table->unsignedBigInteger('user_id')->index()->nullable()->constrained(table: 'users');
            $table->text('key')->nullable();
            $table->string('group',100)->nullable();
            $table->string('sub_group',100)->nullable();
            $table->longText('value')->nullable();
            $table->enum('status',Status::getValues())->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
