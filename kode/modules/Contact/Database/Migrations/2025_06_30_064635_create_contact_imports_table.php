<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Enums\Contact\ContactJobEnum;

class CreateContactImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_imports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->longText('column_map')->nullable();
            $table->longText('meta_data')->nullable();
            $table->enum('status', ContactJobEnum::toArray())->default(ContactJobEnum::PENDING->value)->index();
            $table->unsignedBigInteger('total_rows')->default(0);
            $table->unsignedBigInteger('imported_rows')->default(0);
            $table->unsignedBigInteger('failed_rows')->default(0);
            $table->boolean('include_first_row')->default(false);
            $table->boolean('is_paused')->default(false);
            $table->text('error_message')->nullable();
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
        Schema::dropIfExists('contact_imports');
    }
}
