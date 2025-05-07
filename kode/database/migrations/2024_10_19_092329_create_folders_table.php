<?php

use App\Enums\Common\AffiliateRegistrationStatus;
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
        Schema::create('folders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bo_id')->index()->nullable();
            $table->unsignedBigInteger('parent_id')->index()->nullable();
            $table->string('name',150)->unique();
            $table->string('display_name',150);
            $table->boolean('is_file')->default(false);
            $table->boolean('is_default')->default(true);
            $table->boolean('global_accessibility')->default(false);
            $table->boolean('bo_global')->default(false);
            $table->enum(   'access_type',FileAccessType::getValues())->nullable();
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('folders');
    }
};
