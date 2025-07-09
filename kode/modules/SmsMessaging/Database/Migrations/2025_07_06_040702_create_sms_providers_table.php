<?php

use App\Enums\Common\Status;
use App\Enums\SmsMessage\TypeEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSmsProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_providers', function (Blueprint $table) {

            $table->id();
            $table->string('uid')
                        ->unique()
                        ->index();
            $table->foreignId('user_id')
                        ->constrained('users')
                        ->cascadeOnDelete()
                        ->index();
            $table->enum('type', TypeEnum::toArray())
                        ->index();
            $table->string('name')
                        ->index();
            $table->longText('configuration')
                        ->nullable();
            $table->enum('status', Status::getValues())
                        ->default(Status::ACTIVE->value);
            $table->boolean('is_multiple')
                        ->default(true);
            $table->timestamp("last_active_time")->nullable();
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
        Schema::dropIfExists('sms_providers');
    }
}
