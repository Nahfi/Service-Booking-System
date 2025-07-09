<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Enums\Contact\ContactJobEnum;

class CreateContactGroupDeletionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_group_deletions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contact_group_id')->index();
            $table->unsignedBigInteger('total_contacts')->default(0);
            $table->unsignedBigInteger('processed_contacts')->default(0);
            $table->enum('status', ContactJobEnum::toArray())->default(ContactJobEnum::PENDING->value)->index();
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
        Schema::dropIfExists('contact_group_deletions');
    }
}
