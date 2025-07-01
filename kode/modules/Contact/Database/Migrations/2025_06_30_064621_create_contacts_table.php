<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use modules\Contact\Enums\ContactChannelEnum;
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
            $table->enum('channel', ContactChannelEnum::toArray())->default(ContactChannelEnum::ALL->value)->index();
            $table->string('name')->nullable()->index();
            $table->string('phone_number')->nullable()->index();
            $table->string('email')->nullable()->index();
            $table->longText('custom_attributes')->nullable();
            $table->boolean('is_favorite')->default(false);
            $table->enum('status', Status::getValues())->default(Status::ACTIVE->value)->index();
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
