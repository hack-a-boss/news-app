# API News App 🌍

API que permite gestionar noticias, estilo reddit o menéame, donde los usuarios puedan registrarse y publicar o votar una noticia en una serie de temáticas fijas.

## Endpoints 📚

### Los campos marcados con un asterisco son obligatorios

- POST /register

  - Body (JSON o Form-Data en caso de enviar un avatar):

    - username \*
    - email \*
    - password \*
    - avatar

  - Responde con los datos del usuario creado

- POST /login

  - Body (JSON):

    - email \*
    - password \*

    - Responde con un JWT token

- PUT /user/avatar 🔐

  - Se necesita autenticación

  - Body (Form-Data)

    - avatar \*

  - Responde con la información del usuario actualizada

- GET /news

  - No es obligatoria la autenticación. Si el usuario está autenticado le dará información extra como si ha votado una noticia o no

  - Query params:

    - theme

  - Responde con el listado de noticias. Se puede incluír el query param "theme" para filtrarlas por tema

  - La información que da de cada noticia es:

    - id
    - title
    - content
    - theme
    - photo
    - createdAt
    - ownerId
    - likes
    - dislikes
    - likedByLoggedUser
    - dislikedByLoggedUser

  - Si el usuario está loggeado, likedByLoggedUser va a indicar si le ha dado like a esa noticia o no. Lo mismo con dislikedByLoggedUser

  - Si el usuario no está loggeado, likedByLoggedUser y dislikedByLoggedUser van a ser siempre false

- GET /news/:id

  - No es obligatoria la autenticación. Si el usuario está autenticado le dará información extra como si ha votado la noticia o no

  - Responde con la información de la noticia solicitada con el path param "id"

- POST /news 🔐

  - Se necesita autenticación

  - Body (JSON o Form-Data en caso de enviar una foto):

    - title \*
    - content \*
    - theme \*
    - photo

  - El tema de una noticia solo puede ser uno de estos:

    - sports
    - politics
    - economy
    - education
    - society
    - technology
    - culture
    - science
    - gaming
    - medicine

  - Responde con los datos de la noticia creada

- PATCH /news/:id 🔐

  - Se necesita autenticación y ser el creador de la noticia

  - Body (JSON o Form-Data en caso de enviar una foto):

    - title
    - content
    - theme
    - photo

  - Es obligatorio completar como mínimo uno de los campos

  - Responde con los datos actualizados de la noticia

- DELETE /news/:id 🔐

  - Se necesita autenticación y ser el propietario

  - Responde con un mensaje indicando que la noticia se ha eliminado correctamente

- POST /news/like/:id 🔐

  - Se necesita autenticación

  - Alterna dar/quitar like al post indicado en el param "id"

  - Responde con la información de la noticia actualizada

- POST /news/dislike/:id 🔐

  - Se necesita autenticación

  - Alterna dar/quitar dislike al post indicado en el param "id"

  - Responde con la información de la noticia actualizada

Si se produce algún error, la API responderá con un mensaje en inglés indicando qué ha sucedido. Cuando dice "news" se refiere a varias noticias y cuando dice "news item" se refiere a una única noticia

## Docs 📄

En el proyecto hay una carpeta "docs" con dos cosas:

    - Un fichero .sql con el script de creación de la DB
    - Una colección de Postman con peticiones a todos los endpoints. Al hacer una petición de login el token se guarda automáticamente en las variables de la colección y se envía en el resto de peticiones

## Npm scripts 👨‍💻

- **start**: Inicia el servidor
- **dev**: Inicia el servidor en modo desarrollo. Cada vez que se hace un cambio se reinicia
- **initDb**: Elimina todos los datos de la DB y la crea de cero

## Dudas 🤔

Cualquier error en la API o duda que tengáis, podéis mandarme un correo a samuel.rodriguez.rey@hackaboss.com 🤓
