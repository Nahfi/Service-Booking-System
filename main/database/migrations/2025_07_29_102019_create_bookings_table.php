<?php

use App\Enums\Settings\BookingStatus;
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
        Schema::create('bookings', function (Blueprint $table) {

            $table->id();
            $table->string('booking_number')->unique();
            $table->unsignedBigInteger('user_id')->constrained(table: 'users');
            $table->unsignedBigInteger('service_id')->constrained(table:'services');
            $table->longText('service')->nullable();
            $table->timestamp('booking_date');
            $table->enum('status', BookingStatus::getValues())->default(BookingStatus::PENDING);
            $table->text('notes')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
