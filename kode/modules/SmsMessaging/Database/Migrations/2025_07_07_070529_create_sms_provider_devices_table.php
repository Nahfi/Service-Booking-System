<?php

use App\Enums\Common\Status;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSmsProviderDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_provider_devices', function (Blueprint $table) {
            $table->id();
            $table->string('uid')
                        ->unique()
                        ->index();
            $table->foreignId('sms_provider_id')
                        ->constrained()
                        ->cascadeOnDelete();
            $table->string('ip_address')->nullable();
            $table->text('user_agent')->nullable();
            $table->string('fingerprint')->index();
            $table->string('device_id')->index();
            $table->string('android_version')->nullable();
            $table->longText('meta_data')->nullable();
            $table->string('token')->unique();
            $table->enum('status', Status::getValues())->default(Status::INACTIVE->value);
            $table->timestamp('last_active_at')->nullable();
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
        Schema::dropIfExists('sms_provider_devices');
    }
}
