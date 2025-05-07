# Laravel Application Setup

## Introduction
This repository contains a Laravel-based application. Follow the steps below to set up and run the project on your local machine.

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd <project-folder>/qhub
   ```

3. **Setup the Environment File**
   ```bash
   cp .env.example .env
   ```
   - Update `.env` with your database credentials:
     ```env
     DB_DATABASE=<your-database>
     DB_USERNAME=<your-database-username>
     DB_PASSWORD=<your-database-password>
     ```

4. **Install Composer Dependencies**
   ```bash
   composer install --ignore-platform-reqs
   ```
5. **Migrate Database**
   ```bash
   php artisan migrate
   ```

6. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

---

## Database Setup

7. **Modify Database Seeder File**
   - Open `database/seeders/DatabaseSeeder.php`.
   - Uncomment the relevant class calls as instructed in the file.

8. **Run Database Seeders**
   ```bash
   php artisan db:seed
   ```

9. **Revert Changes to Seeder File**
   - Revert any changes made to `database/seeders/DatabaseSeeder.php` after successfully running the seeders.

---

## Default user Credentials

After setting up the database, you can use the following credentials to log in as the Super Admin:

- **Username:** `demouser`
- **Name:** `demouser`
- **Email:** `demouser@gmail.com`
- **Password:** `123123`

---

## Postman Collection

The application’s API endpoints are now accessible. Use the provided Postman collection to test them.

---

## Additional Notes

- Ensure your local environment meets the Laravel application requirements.
- For any issues or questions, refer to the project documentation or contact the repository maintainer.

Enjoy coding!

