<?php

use App\Enums\Common\Status;
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
            $table->string('name',191);
            $table->string('key',191);
            $table->string('subject');
            $table->longText('mail_body')->nullable();
            $table->longText('template_key')->nullable();
            $table->longText('editor_files')->nullable();
            $table->enum('email_notification', Status::getValues())->default(Status::INACTIVE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_templates');
    }
};
