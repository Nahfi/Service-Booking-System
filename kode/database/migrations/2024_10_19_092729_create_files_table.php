<?php

use App\Enums\Common\FileAccessType;
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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('folder_id')->nullable();
            $table->unsignedBigInteger('bo_id')->nullable();
            $table->morphs('fileable');
            $table->string('folder_name',191)->index()->nullable();
            $table->string('name',191)->index()->nullable();
            $table->string('display_name',191)->index()->nullable();
            $table->string('disk',55)->index()->nullable();
            $table->string('type',100)->index()->nullable();
            $table->string('size',100)->nullable();
            $table->string('extension',100)->nullable();
            $table->enum(   'access_type',FileAccessType::getValues())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
