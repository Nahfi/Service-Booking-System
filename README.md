
# 🛠️ Service Booking System

A modern **Laravel 11.9** project running on **PHP 8.2**, designed to manage online service bookings efficiently. This system supports user registration, service listing, bookings, and admin control, with a customized folder structure for enhanced flexibility.

---

## 📁 Project Structure

```

project-root/
├── assets/
├── main/                  # Laravel 11.9 app here
├── index.php              # Moved from public/
├── .htaccess              # Moved from public/
├── docker/
│   ├── nginx/
│   │   └── default.conf
│   ├── php/
│   │   └── Dockerfile
├── docker-compose.yml

````

---

## 🚀 Features

- Laravel 11.9 with PHP 8.2 support
- Booking management system
- Admin & user separation
- Fully Dockerized environment
- Custom folder structure for index routing
- Supports seeding and migrations

---

## 🐳 Docker Setup (Recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your/repo.git
cd your-project
````

### 2. Create `.env` File

```bash
cp main/.env.example main/.env
```

Update DB section:

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=service_booking_system
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### 3. Run Docker

```bash
docker-compose up -d --build
```

### 4. Composer Install, Migrate & Seed

```bash
docker exec -it laravel-app composer install --ignore-platform-reqs
docker exec -it laravel-app php artisan key:generate
docker exec -it laravel-app php artisan migrate --seed
```

### 5. Visit the App

Open in browser: [http://localhost:8000](http://localhost:8000)

---

## 💻 Local Development (Without Docker)

### 1. Requirements

* PHP 8.2+
* Composer
* MySQL 5.7/8

### 2. Setup Steps

```bash
cd main
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
npm install && npm run dev
php artisan serve
```

Open: [http://localhost:8000](http://localhost:8000)

---

## 🖼️ Screenshots (Sample UI)


---

## 🧪 Running Tests

```bash
php artisan test
```

---

## 📦 Deployment Notes

* Set `APP_ENV=production` in `.env`
* Run:

  ```bash
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  ```
* Ensure correct file/folder permissions

---

## 👤 Author

**Hasibul Islam Nafiz**
📧 [nafiz0khan1@gmail.com](mailto:nafiz0khan1@gmail.com)

---


