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
        Schema::create('settings', function (Blueprint $table) {

            $table->id();
            $table->text('key');
            $table->string('group',100)->nullable();
            $table->string('sub_group',100)->nullable();
            $table->longText('value')->nullable();
            $table->enum('status',Status::getValues())->default(Status::ACTIVE);
            $table->boolean('is_default')->default(false);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
