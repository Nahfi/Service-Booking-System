<?php

use App\Enums\Common\MaritalStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('users', 'marital_status')) {
            // Get column info using raw query
            $columnInfo = DB::selectOne(
                "SHOW COLUMNS FROM users WHERE Field = 'marital_status'"
            );
            
            // Check if column is not nullable (NULL field says 'NO')
            if ($columnInfo && $columnInfo->Null === 'NO') {
                Schema::table('users', function (Blueprint $table) {
                    $table->enum('marital_status', MaritalStatus::getValues())
                          ->nullable()
                          ->change();
                });
            }
        }
    }

    /**
     * Run the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'marital_status')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('marital_status', MaritalStatus::getValues())
                      ->nullable(false)
                      ->change();
            });
        }
    }
};