Легкий сервер на node.js

Установка зависимостей 
>npm i

Запуск сервера
>npm start

Сервер является впосредником между клиентом и абстрактным хранилищем.

В роли хранилища выступает черный ящик, как оно работает и что из себя представляет - скрыто за rest интерфейсом.

Это упрощает работу с ним, позволяет использовать на любых устройствах, на которых есть самая простая библиотека работы с сетью. 
Это может быть IoT устройство, программа на Android, другой сервер, браузер, игра на Playstation4, консоль linux и тд.

Если хранилище требует обслуживание, например жесткий диск износился, или мы хотим перенести сервер на другую площадку - мы просто меняем запись в DNS и клиент продолжает работать с хранилищем, а то что это уже совершенно другой сервер, а возможно и другая база данных, его не должно волновать. Или кол-во клиентов выросло до огромного количества, и нам нужно построить целый кластер из хранилищ - для конечного клиента все остается как было, тот же url, тот же набор комманд.

Доступный набор комманд для работы с хранилищем:
- __get /api/item/list__ запрос всех доступных item
- __get /api/item/:id__ запрос item по id
- __put /api/item/:id__ *{ "name": string }* редактирование поля name у item по id
- __post /api/item__ *{ "name": string }* создание item с полем name
- __delete /api/item/:id__ удаление item по id

Частые ошибки по созданию и работе с апи сервером:
*Различные ошибки по непониманию асинхронного кода я не рассматриваю, это отдельная большая тема*
- Повторный запуск сервера на уже занятый кем-то порт
*Можно проверять свободен ли порт в системе и предлагать запустить на другом порту*
- Неправильно настроеный firewall обрезает обращение на этот порт и при вызове нашей апи случается ошибка или timeout
*Отключить firewall и проверить еще раз, чтобы исключить причину*
- Приложение поднято на 3000 порту, а человек по привычке обращается на 80 или 8080
- С приложения в браузере происходит ошибка вызова апи по причине политики CORS
*Отключить CORS в express.js или принудительно в браузере для поиска причины и настроить исключения для нужных доменов*
- Для разных типов хранилищ масса различных проблем по выбору драйвера для nodejs под различные системы; недоступности по tcp/socket по различным причинам; отсутствия прав доступа; отстутствие таблиц: неверные типы данных и тд
- Запуск сервера на новой версии nodejs со старой папкой node_modules
*Удалить папку и сделать npm i*
