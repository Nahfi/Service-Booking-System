FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    bash \
    zip \
    unzip \
    curl \
    oniguruma-dev \
    libxml2-dev \
    postgresql-dev \
    libzip-dev \
    mysql-client \
    && docker-php-ext-install pdo_mysql mbstring xml zip bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD ["php-fpm"]
