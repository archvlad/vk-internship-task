![example workflow](https://github.com/archvlad/vk-internship-task/actions/workflows/ci.yml/badge.svg)
# Задание для стажировки Frontend Developer
Необходимо получить с сервера и отобразить список элементов. Список должен поддерживать бесконечный плавный скролл, постепенную подгрузку элементов, локальное удаление и редактирование.
## Технологии
- **TypeScript**
- **React**
- **MobX**
- **Ant Design** - выбрал данный UI Kit из-за большого количества компонентов и приятного дизайна + давно хотел применить на практике.
## Установка и запуск
### Локально
1. Установите зависимости:
   ```bash
   npm ci
   ```
2. Запустите приложение в режиме разработки:
   ```bash
   npm run dev
   ```
3. Откройте по адресу [http://localhost:5173/](http://localhost:5173/)

### Через Docker
1. Постройте Docker-образ:
   ```bash
   docker build -t archvlad-vk-internship-task .
   ```
2. Запустите контейнер:
   ```bash
   docker run -d -p 3000:80 archvlad-vk-internship-task
   ```
3. Откройте по адресу [http://localhost:3000/](http://localhost:3000/)

### Важно
Приложение использует [The Movie Database API](https://www.themoviedb.org/), которое блокирует запросы с территории РФ, поэтому для корректной работы следует использовать VPN.
