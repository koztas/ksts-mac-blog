Области хранения данных (Data Storage Areas):

    -   база данных (БД) на json-server (database (db) on json server)
    -   BFF (Emulator-agent between client and server: backend for frontend)
    -   redux store (storing application state)

Сущности приложения (Application Entities):

    -   пользователь (user): БД (список пользователей) (db (list of users)), BFF (сессия текущего пользователя (current user session)), store (отображение в браузере (display in browser))

    -   роль пользователя (users role): БД (список ролей) (db (roles list)), BFF (сессия пользователя с ролью (user session with role)), store (использование на клиенте (using on the client))

    -   статья (post): БД (список статей) (db (posts list)), store (отображение в браузере (display in browser))

    -   комментарий (comment): БД (список комментариев) (db (comments list)), store (отображение в браузере (display in browser))

Таблицы БД (db tables):

    -   пользователи (users): id / login / password / registered_at / role_id
    - 	роли (roles): id / name
    - 	статьи (posts): id / title / image_url / comtent / published_at
    - 	комментарии (comments): id / author_id / post_id / content

Схема состояния на BFF (state scheme on BFF): - сессия текущего пользователя (current user session): login / password / role

Схема для redux store (на клиенте)(redux store scheme(on the client)):

    - 	user: id / login / roleId
    - 	posts: массив post (posts array): id / title / imageUrl / publishedAt /  commentsCount
    - 	post: id / title / imageUrl / content / publishedAt / comments:
    	массив comment (comments array): id / author / content / piblishedAt
    - 	users: массив user (user array): id / login / registeredAt / role
