<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSmsGatewaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_gateways', function (Blueprint $table) {
            $table->id();
            $table->string('uid')
                        ->unique()
                        ->index();
            $table->foreignId('user_id')
                        ->constrained('users', 'id', 'sms_gateways_user_id_foreign')
                        ->cascadeOnDelete();
            $table->foreignId('sms_provider_id')
                        ->constrained('sms_providers', 'id', 'sms_gateways_sms_provider_id_foreign')
                        ->cascadeOnDelete();
           $table->foreignId('sms_provider_device_id')
                    ->nullable()
                    ->constrained('sms_provider_devices', 'id', 'sms_gateways_sms_provider_device_id_foreign')
                    ->cascadeOnDelete();
            $table->tinyInteger('sim_slot')
                        ->nullable();
            $table->string('identifier')
                        ->index();
            $table->string('identifier_value')
                        ->nullable()
                        ->index();
            $table->longText('credentials')
                        ->nullable();
            $table->longText('configuration')
                        ->nullable();
            $table->longText('rate_limit')
                        ->nullable();
            $table->enum('status', Status::getValues())
                        ->default(Status::INACTIVE->value);
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
        Schema::dropIfExists('sms_gateways');
    }
}
