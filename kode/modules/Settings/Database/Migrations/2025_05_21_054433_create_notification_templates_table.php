<?php

use App\Enums\Common\Status;
use App\Enums\Settings\NotificationType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_templates', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('user_id')->index()->nullable()->constrained(table: 'users');
            $table->string('name',191);
            $table->string('key',191);
            $table->string('subject');
            $table->longText('mail_body')->nullable();
            $table->text('sms_body')->nullable();
            $table->text('push_notification_body')->nullable();
            $table->longText('template_key')->nullable();
            $table->longText('editor_files')->nullable();
            $table->enum('type',NotificationType::getValues())->nullable();
            $table->boolean('real_time_disable')->default(true);
            $table->boolean('sms_disable')->default(true);
            $table->boolean('mail_disable')->default(true);
            $table->enum('sms_notification', Status::getValues())->default(Status::INACTIVE);
            $table->enum('email_notification', Status::getValues())->default(Status::INACTIVE);
            $table->enum('push_notification', Status::getValues())->default(Status::INACTIVE);
            $table->enum('site_notificaton', Status::getValues())->default(Status::INACTIVE);

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
        Schema::dropIfExists('notification_templates');
    }
};
