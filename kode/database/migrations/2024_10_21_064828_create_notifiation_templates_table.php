<?php

use App\Enums\Common\Status;
use App\Enums\Settings\NotificationTemplateType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notification_templates', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('bo_id')->index()->nullable();
            $table->string("name",255)->index();
            $table->string("slug",255)->index();
            $table->string("subject",255)->nullable();
            $table->longText("mail_body")->nullable();
            $table->longText("sms_body")->nullable();
            $table->longText("push_notification_body")->nullable();
            $table->longText("template_key")->nullable();
            $table->longText("editor_files")->nullable();

            $table->enum('type',NotificationTemplateType::getValues())->nullable();

            $table->boolean('is_default')->default(false);

            $table->boolean('is_real_time_disable')->default(false);
            $table->boolean('is_sms_disable')->default(false);
            $table->boolean('is_mail_disable')->default(false);

            $table->enum('email_notification',Status::getValues());
            $table->enum('sms_notification',Status::getValues());
            $table->enum('push_notification',Status::getValues());
            $table->enum('site_notificaton',Status::getValues());

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifiation_templates');
    }
};
