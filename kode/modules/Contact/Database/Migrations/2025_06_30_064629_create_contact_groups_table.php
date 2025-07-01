<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use modules\Contact\Enums\ContactChannelEnum;

class CreateContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_groups', function (Blueprint $table) {
            $table->id();
            $table->string('uid')->unique()->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->enum('channel', ContactChannelEnum::toArray())->default(ContactChannelEnum::ALL->value)->index()->index();
            $table->string('name')->index();
            $table->enum('status', Status::getValues())->default(Status::ACTIVE->value)->index();
            $table->longText('attribute_configurations')->nullable();
            $table->boolean('is_permanently_deleted')->nullable()->index();
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
        Schema::dropIfExists('contact_groups');
    }
}
