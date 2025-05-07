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
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('uid',100)->index()->nullable();
            $table->string('name',100)->unique();
            $table->longText('price_configuration')->nullable();
            $table->longText( 'features')->nullable();
            $table->mediumText( 'description')->nullable();
            $table->integer( 'trial_days')->default(0);
            $table->integer( 'total_location')->default(0);
            $table->integer( 'max_employee')->default(0);
            $table->enum('status',Status::getValues());
            $table->boolean( 'is_free')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
