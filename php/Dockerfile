# Используем официальный образ PHP-FPM
FROM php:8.2-fpm

# Устанавливаем необходимые расширения PHP
RUN docker-php-ext-install pdo pdo_mysql

# Копируем текущий код приложения в контейнер
COPY . /var/www/html

# Устанавливаем рабочую директорию
WORKDIR /var/www/html