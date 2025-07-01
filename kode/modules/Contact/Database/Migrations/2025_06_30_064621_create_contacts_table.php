<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use modules\Contact\Enums\ChannelEnum;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('uid')->unique()->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->unsignedBigInteger('contact_group_id')->nullable()->index();
            $table->enum('channel', ChannelEnum::getValues())->default(ChannelEnum::ALL)->index();
            $table->string('name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->longText('custom_attributes')->nullable();
            $table->boolean('is_favorite')->default(false)->index();
            $table->enum('status', Status::getValues())->default(Status::ACTIVE)->index();
            $table->softDeletes();
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
        Schema::dropIfExists('contacts');
    }
}
