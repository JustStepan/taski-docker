# Дорожная карта: Развертывание Django-проектов на сервере

## Цель

Научиться самостоятельно разворачивать Django-проекты на собственном сервере с использованием Docker, Nginx, Gunicorn и сопутствующих технологий.

---

## Этап 1: Основы Linux и работа с сервером (1-2 недели)

### Что изучить:

- **Основы командной строки Linux**
  - Навигация: `cd`, `ls`, `pwd`
  - Работа с файлами: `cp`, `mv`, `rm`, `mkdir`, `touch`
  - Просмотр содержимого: `cat`, `less`, `head`, `tail`
  - Права доступа: `chmod`, `chown`, `ls -la`

- **Подключение к серверу**
  - SSH-ключи: генерация (`ssh-keygen`), копирование на сервер
  - Подключение: `ssh user@server_ip`
  - Безопасность: отключение пароля, использование ключей

- **Управление пакетами**
  - `apt update`, `apt upgrade`, `apt install`
  - Удаление пакетов: `apt remove`, `apt autoremove`

- **Управление процессами**
  - Просмотр процессов: `ps`, `top`, `htop`
  - Управление: `kill`, `killall`
  - Фоновые процессы: `&`, `nohup`, `screen`, `tmux`

### Практика:

1. Арендовать VPS (Digital Ocean, Timeweb, Selectel)
2. Подключиться по SSH
3. Создать пользователя, настроить SSH-ключи
4. Установить базовый софт (curl, git, nano/vim)
5. Настроить firewall (ufw)

### Ресурсы:

- [Linux Journey](https://linuxjourney.com/) - интерактивный курс
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials) - практические гайды

---

## Этап 2: Понимание веб-архитектуры (1 неделя)

### Что изучить:

- **Как работает веб**
  - HTTP/HTTPS протоколы
  - Клиент-серверная архитектура
  - DNS и домены

- **Статика vs Динамика**
  - Что такое статические файлы (HTML, CSS, JS, изображения)
  - Что такое динамический контент (Django генерирует HTML)

- **Роли компонентов**
  - **Django** - бизнес-логика, БД, генерация HTML/JSON
  - **Gunicorn** - WSGI-сервер (запускает Django, обрабатывает Python-код)
  - **Nginx** - веб-сервер (раздает статику, проксирует запросы к Gunicorn)
  - **PostgreSQL** - база данных

### Схема взаимодействия:

```
Браузер → Nginx (порт 80/443)
           ↓
           ├─→ Статика (/static/, /media/) → Отдает напрямую
           └─→ Динамика (/api/, /admin/) → Gunicorn → Django → PostgreSQL
```

### Практика:

1. Нарисовать схему своего проекта
2. Понять, где хранится статика, где код Django
3. Проследить путь запроса от браузера до БД

### Ресурсы:

- [How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- Статья "Django Deployment for Beginners" на Medium

---

## Этап 3: Django локально (1-2 недели)

### Что изучить:

- **Django settings**
  - `DEBUG`, `ALLOWED_HOSTS`, `SECRET_KEY`
  - `STATIC_URL`, `STATIC_ROOT`, `STATICFILES_DIRS`
  - `MEDIA_URL`, `MEDIA_ROOT`
  - Переменные окружения (`os.getenv()`)

- **Статика в Django**
  - `python manage.py collectstatic` - зачем нужна
  - Разница между dev (Django раздает) и prod (Nginx раздает)

- **База данных**
  - SQLite vs PostgreSQL
  - Миграции: `makemigrations`, `migrate`

### Практика:

1. Создать простой Django-проект
2. Настроить `ALLOWED_HOSTS`, `STATIC_ROOT`
3. Запустить с `DEBUG=False` локально
4. Понять, почему статика не работает без `collectstatic`
5. Настроить PostgreSQL локально

### Ресурсы:

- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- Django documentation: Static files

---

## Этап 4: Docker основы (2 недели)

### Что изучить:

- **Концепции Docker**
  - Образ (image) vs Контейнер (container)
  - Dockerfile - рецепт сборки образа
  - Volumes - постоянное хранилище данных
  - Networks - связь между контейнерами

- **Основные команды**
  - `docker build` - собрать образ
  - `docker run` - запустить контейнер
  - `docker ps` - список контейнеров
  - `docker logs` - логи контейнера
  - `docker exec` - выполнить команду в контейнере
  - `docker stop/start/rm` - управление контейнерами

- **Dockerfile**
  - `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`
  - Многослойность образов
  - Оптимизация размера образа

### Практика:

1. Установить Docker Desktop (Mac) / Docker Engine (Linux)
2. Написать простой Dockerfile для Django-проекта
3. Собрать образ, запустить контейнер
4. Зайти внутрь контейнера: `docker exec -it <container> bash`
5. Пробросить порты, примонтировать volumes

### Ресурсы:

- [Docker for Beginners](https://docker-curriculum.com/)
- [Play with Docker](https://labs.play-with-docker.com/) - интерактивная практика
- Официальная документация Docker

---

## Этап 5: Docker Compose (1-2 недели)

### Что изучить:

- **Зачем Docker Compose**
  - Управление несколькими контейнерами
  - Декларативная конфигурация (YAML)
  - Связь контейнеров через networks

- **docker-compose.yml**
  - `services` - контейнеры
  - `volumes` - хранилища
  - `networks` - сети
  - `env_file` - переменные окружения
  - `depends_on` - зависимости между контейнерами

- **Команды Docker Compose**
  - `docker compose up` - запустить всё
  - `docker compose down` - остановить и удалить
  - `docker compose logs` - логи
  - `docker compose exec` - выполнить команду в контейнере
  - `docker compose ps` - статус контейнеров

### Практика:

1. Создать `docker-compose.yml` с Django + PostgreSQL
2. Настроить volumes для БД (чтобы данные не терялись)
3. Настроить networks (чтобы Django видел PostgreSQL)
4. Запустить проект одной командой
5. Выполнить миграции через `docker compose exec`

### Ресурсы:

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- Курс на YouTube: "Docker Compose Tutorial"

---

## Этап 6: Nginx основы (1 неделя)

### Что изучить:

- **Что такое Nginx**
  - Веб-сервер и reverse proxy
  - Когда использовать Nginx, а когда Gunicorn

- **Конфигурация Nginx**
  - `server` блоки
  - `location` блоки
  - `proxy_pass` - проксирование запросов
  - `alias` vs `root` - раздача статики
  - `proxy_set_header` - передача заголовков

- **Типичная схема для Django**

  ```
  location /static/ {
    alias /path/to/static/;  # Nginx раздает напрямую
  }

  location / {
    proxy_pass http://gunicorn:8000;  # Отправляет в Django
  }
  ```

### Практика:

1. Установить Nginx локально
2. Настроить простую раздачу статики
3. Настроить proxy_pass к Django
4. Понять разницу между `alias` и `root`
5. Добавить Nginx в docker-compose.yml

### Ресурсы:

- [Nginx Beginner's Guide](http://nginx.org/en/docs/beginners_guide.html)
- DigitalOcean: "Understanding Nginx Configuration"

---

## Этап 7: Полная сборка проекта в Docker (2 недели)

### Что изучить:

- **Многоконтейнерная архитектура**
  - Backend (Django + Gunicorn)
  - Frontend (React/Vue сборка)
  - Gateway (Nginx)
  - Database (PostgreSQL)

- **Volumes для статики**
  - Backend собирает статику → volume
  - Nginx читает из того же volume

- **Разделение dev и prod**
  - `docker-compose.yml` - для разработки (build)
  - `docker-compose.production.yml` - для продакшена (image)

### Практика:

1. Создать 4 Dockerfile: backend, frontend, gateway, db
2. Настроить `docker-compose.yml` с volumes для статики
3. Настроить Nginx внутри контейнера (gateway)
4. Запустить весь стек локально
5. Убедиться, что статика раздается корректно

### Текущая структура volumes:

```yaml
volumes:
  static: # Общий том для статики

services:
  backend:
    volumes:
      - static:/backend_static # Backend пишет сюда

  gateway:
    volumes:
      - static:/staticfiles # Nginx читает отсюда
```

---

## Этап 8: Docker Hub и CI/CD основы (1 неделя)

### Что изучить:

- **Docker Registry**
  - Что такое Docker Hub
  - Push/pull образов
  - Теги и версионирование

- **Кросс-платформенная сборка**
  - Mac (ARM64) vs Linux сервер (AMD64)
  - `docker buildx` для сборки под разные архитектуры

- **Автоматизация**
  - Ручная сборка и push
  - Основы GitHub Actions (опционально)

### Практика:

1. Создать аккаунт на Docker Hub
2. Собрать образ для AMD64 с Mac:
   ```bash
   docker buildx build --platform linux/amd64 -t username/app --push .
   ```
3. Протестировать pull образа на другой машине
4. Настроить версионирование (теги: latest, v1.0.0)

### Ресурсы:

- Docker Hub Documentation
- GitHub Actions: Docker Build and Push

---

## Этап 9: Развертывание на сервере (2-3 недели)

### Что изучить:

- **Подготовка сервера**
  - Установка Docker и Docker Compose
  - Настройка firewall (открыть 80, 443)
  - Создание структуры директорий

- **Копирование файлов**
  - `scp` для копирования файлов
  - Git clone на сервере (альтернатива)

- **Запуск в production**
  - `docker-compose.production.yml`
  - Флаг `-d` (detached mode)
  - Управление логами

- **Настройка Nginx на хосте**
  - Nginx на сервере как entry point
  - Проксирование в Docker на порт 8000
  - Разделение трафика между проектами

### Практика:

1. Настроить сервер: установить Docker
2. Скопировать `docker-compose.production.yml` и `.env`
3. Запустить: `docker compose -f docker-compose.production.yml up -d`
4. Выполнить миграции и collectstatic
5. Настроить Nginx на хосте для проксирования
6. Проверить работу приложения по IP

### Типичные проблемы:

- `ALLOWED_HOSTS` не настроен
- Статика не раздается (volumes не смонтированы)
- Nginx на хосте конфликтует с Nginx в Docker
- База данных не инициализирована (нет миграций)

---

## Этап 10: HTTPS и домены (1 неделя)

### Что изучить:

- **DNS**
  - A-записи (привязка домена к IP)
  - Покупка домена (Namecheap, reg.ru)

- **SSL-сертификаты**
  - Let's Encrypt - бесплатные сертификаты
  - Certbot - автоматизация получения сертификатов

- **Nginx + HTTPS**
  - Настройка SSL в конфиге
  - Автоматическое обновление сертификатов

### Практика:

1. Купить домен (или использовать бесплатный)
2. Настроить A-запись на IP сервера
3. Установить Certbot на сервер
4. Получить SSL-сертификат:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```
5. Настроить автообновление сертификатов

### Ресурсы:

- [Certbot Instructions](https://certbot.eff.org/)
- DigitalOcean: "How To Secure Nginx with Let's Encrypt"

---

## Этап 11: Мониторинг и отладка (1-2 недели)

### Что изучить:

- **Логи**
  - `docker compose logs` - логи контейнеров
  - `sudo tail -f /var/log/nginx/error.log` - логи Nginx
  - Логи Django в контейнере

- **Отладка проблем**
  - Статика не загружается - проверить volumes
  - 502 Bad Gateway - Gunicorn не запущен
  - DisallowedHost - настроить ALLOWED_HOSTS
  - Контейнер падает - проверить логи

- **Мониторинг**
  - `htop` - нагрузка на сервер
  - `docker stats` - ресурсы контейнеров
  - Простой мониторинг с Uptime Kuma (опционально)

### Практика:

1. Намеренно сломать проект (убрать ALLOWED_HOSTS)
2. Найти ошибку через логи
3. Изучить типичные ошибки и их решения
4. Настроить автозапуск Docker Compose через systemd

---

## Этап 12: Продвинутые темы (опционально, 2-4 недели)

### Темы для углубления:

- **Оптимизация Docker**
  - Multi-stage builds
  - Кеширование слоев
  - Уменьшение размера образов

- **Безопасность**
  - Не хранить секреты в коде
  - Docker secrets
  - Регулярное обновление образов

- **Масштабирование**
  - Docker Swarm
  - Kubernetes (для больших проектов)
  - Load balancing

- **Backup и восстановление**
  - Backup БД (PostgreSQL dump)
  - Backup volumes
  - Стратегии восстановления

- **CI/CD**
  - GitHub Actions для автоматического деплоя
  - Тестирование в Docker
  - Rolling updates

---

## План обучения (итого: 3-4 месяца)

### Неделя 1-2: Linux и SSH

- Каждый день 1-2 часа работы с сервером
- Практика: настройка VPS, базовые команды

### Неделя 3: Теория веб-архитектуры

- Изучение схем, рисование диаграмм
- Понимание роли каждого компонента

### Неделя 4-5: Django локально

- Настройка settings для production
- Работа со статикой и БД

### Неделя 6-7: Docker основы

- Ежедневная практика с контейнерами
- Написание Dockerfile

### Неделя 8-9: Docker Compose

- Оркестрация нескольких контейнеров
- Volumes и networks

### Неделя 10: Nginx

- Изучение конфигов
- Практика с proxy_pass

### Неделя 11-12: Полная сборка в Docker

- Интеграция всех компонентов
- Тестирование локально

### Неделя 13: Docker Hub

- Публикация образов
- Кросс-платформенная сборка

### Неделя 14-16: Развертывание на сервере

- Первый полноценный деплой
- Решение проблем

### Неделя 17: HTTPS

- Настройка домена и SSL

### Неделя 18-19: Отладка и мониторинг

- Изучение логов
- Автоматизация

### Неделя 20+: Продвинутые темы (опционально)

---

## Полезные ресурсы

### Документация:

- [Django Deployment](https://docs.djangoproject.com/en/4.2/howto/deployment/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](http://nginx.org/en/docs/)

### Курсы:

- Яндекс.Практикум (ваш текущий курс)
- Docker Mastery на Udemy
- Linux Academy

### Книги:

- "Docker Deep Dive" - Nigel Poulton
- "Two Scoops of Django" - глава про deployment

### Сообщества:

- Docker Community Forums
- Django Forum
- Stack Overflow

---

## Чек-лист: Я готов деплоить самостоятельно

✅ Понимаю разницу между образом и контейнером
✅ Могу написать Dockerfile с нуля
✅ Понимаю, как работают volumes в Docker
✅ Могу настроить docker-compose.yml для Django + PostgreSQL + Nginx
✅ Понимаю, почему нужен Nginx перед Gunicorn
✅ Знаю, как раздавать статику через Nginx
✅ Понимаю, что такое ALLOWED_HOSTS и зачем он нужен
✅ Умею читать логи Docker и Nginx
✅ Могу подключиться к серверу по SSH и настроить его
✅ Понимаю, как работает proxy_pass в Nginx
✅ Могу собрать образ для другой архитектуры (buildx)
✅ Знаю, как применить миграции в Docker-контейнере
✅ Могу настроить HTTPS с Let's Encrypt

---

## Заключение

Не спеши. Лучше потратить 3-4 месяца и **понять**, чем за 2 недели все скопировать, но не разобраться. Каждый этап подкрепляй практикой. Ломай специально, чини, экспериментируй.

Главное правило: **понимать, а не копировать**.

Удачи! 🚀
