<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use modules\Contact\Enums\ContactImportEnum;

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
            $table->unsignedBigInteger('contact_group_id')->nullable();
            $table->longText('column_map')->nullable();
            $table->enum('status', ContactImportEnum::toArray())->default(ContactImportEnum::PENDING->value)->index();
            $table->bigInteger('total_rows')->nullable();
            $table->bigInteger('imported_rows')->nullable();
            $table->bigInteger('failed_rows')->nullable();
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
