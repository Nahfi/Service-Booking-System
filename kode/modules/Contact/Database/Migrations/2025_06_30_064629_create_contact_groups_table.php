<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use modules\Contact\Enums\ChannelEnum;

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
            $table->enum('channel', ChannelEnum::getValues())->default(ChannelEnum::ALL)->index()->index();
            $table->string('name')->nullable()->index();
            $table->enum('status', Status::getValues())->default(Status::ACTIVE)->index();
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
