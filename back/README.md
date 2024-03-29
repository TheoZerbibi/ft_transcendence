<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# launch linter
$ pnpm run lint

# e2e tests
$ pnpm run test:e2e
```

## API

The Api use JWT for security. When you create or signin into a account, the api return a `access_token`.


### Get user information

```http
  GET users/me
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |

    curl -i --location 'http://localhost:3001/users/me' --header 'Authorization: Bearer ${access_token}'

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 270
    ETag: W/"10e-JXYhFr/5j7/2WuFBuaH30LCYy1Q"
    Date: Mon, 11 Sep 2023 10:50:30 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":1,"login":"Foo","display_name":"Bar","email":"Foo@Bar.fr","dAuth":false,"avatar":"https://cdn.Foo.fr/users/Bar.jpg","createdAt":"2023-09-11T10:46:26.229Z","updatedAt":"2023-09-11T10:46:26.229Z","lastLogin":"2023-09-11T10:46:26.229Z"}

### Get specific user

```http
  GET users/${login}
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |

    curl --location 'http://localhost:3001/users/${login} --header 'Authorization: Bearer ${access_token}'

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 184
    ETag: W/"b8-wFF8uksFtWEHwZmkeMpGPA3L9ps"
    Date: Mon, 11 Sep 2023 10:53:18 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":1,"login":"Foo","display_name":"Bar","avatar":"https://cdn.Foo.fr/users/Bar.jpg","createdAt":"2023-09-11T10:46:26.229Z","lastLogin":"2023-09-11T10:46:26.229Z"}

### Change user avatar or display_name

```http
  PATCH users
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |
| `display_name` | `string` | A new display_name.               |
| `avatar`       | `string` | A link to a image.                |

    curl --location --request PATCH 'http://localhost:3001/users' --header 'Authorization: Bearer ${access_token}' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'display_name=${display_name}' --data-urlencode 'avatar=${avatarLink}'`

#### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 300
    ETag: W/"12c-sw1AkyPgTG8hFo8S4ODncNBpuxo"
    Date: Mon, 11 Sep 2023 10:54:35 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"id":1,"login":"Foo","display_name":"Wiz","email":"Foo@Bar.fr","dAuth":false,"avatar":"https://cdn.Foo.fr/users/Wiz.jpg","createdAt":"2023-09-11T10:46:26.229Z","updatedAt":"2023-09-11T10:54:35.764Z","lastLogin":"2023-09-11T10:46:26.229Z"}

### Create new game

```http
  POST /game/createGame
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |

    curl -X 'POST' 'http://localhost:3001/game/createGame' -H 'accept: application/json' -H 'Authorization: Bearer ${access_token}'

#### Response :

    access-control-allow-credentials: true
    access-control-allow-origin: *
    connection: keep-alive
    content-length: 43
    content-type: application/json; charset=utf-8
    date: Fri,13 Oct 2023 17:38:54 GMT
    etag: W/"2b-dGnJzt6gv1nJjX6DJ9RztDWptng"
    keep-alive: timeout=5
    x-powered-by: Express

    { "id": 1, "uid": "4e3bf9fc-4702-4693-82e4-c8c801e7f11a", "is_private": false, "created_at", "2023-10-13T17:33:08.769Z", "started_at": null, "end_at": null }

### Log into a user

```http
  GET /game/getEmptyGame
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |

    curl -X 'GET' 'http://localhost:3001/game/getEmptyGame' -H 'accept: application/json' -H 'Authorization: Bearer ${access_token}'

#### Response :

    access-control-allow-credentials: true
    access-control-allow-origin: *
    connection: keep-alive
    content-length: 144
    content-type: application/json; charset=utf-8
    date: Fri,13 Oct 2023 17:45:28 GMT
    etag: W/"90-45qCZbc8skNBIQQ5jAthKgMJCuM"
    keep-alive: timeout=5
    x-powered-by: Express

    { "id": 1, "uid": "4e3bf9fc-4702-4693-82e4-c8c801e7f11a", "is_private": false, "created_at": "2023-10-13T17:45:23.851Z", "started_at": null, "end_at": null }
    or
    {"uid": null}

### Get user information

```http
  POST /game/${uuid}
```

| Parameter      | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `access_token` | `string` | **Required**. A JWT access token. |

curl -X 'POST' 'http://localhost:3001/game/4e3bf9fc-4702-4693-82e4-c8c801e7f11a' -H 'accept: application/json' -H 'Authorization: Bearer ${access_token}'

#### Response :

    access-control-allow-credentials: true
    access-control-allow-origin: *
    connection: keep-alive
    content-length: 201
    content-type: application/json; charset=utf-8
    date: Fri,13 Oct 2023 17:49:53 GMT
    etag: W/"c9-uQOKO6YOJInpnJetM6N0tFkZcUA"
    keep-alive: timeout=5
    x-powered-by: Express

    { "id": 1, "uid": "4e3bf9fc-4702-4693-82e4-c8c801e7f11a", "is_private": false, "created_at": "2023-10-13T17:45:23.851Z", "started_at": null, "end_at": null, "player_id": 1, "game_id": 1, "is_win": false, "is_spec": false }

## Environment Variables

### POSTGRES

`POSTGRES_HOST` : The host for postgres container.
`POSTGRES_PORT` : The port for postgres container.
`POSTGRES_USER` : The admin user for postgres container.
`POSTGRES_PASSWORD` : The password for postgres container.
`POSTGRES_DB` : The database name for postgres container.
`DATABASE_URL` : The full URL for prisma. See [database connection reference](https://www.prisma.io/docs/reference/database-reference/connection-urls) on Prisma docs.

### REDIS

`REDIS_HOST` : The host for redis container.
`REDIS_PORT` : The port for redis container.
`REDIS_PASS` : The password for redis container.
`REDIS_URL` : The full URL of Redis. See [Redis URI](https://redis.io/docs/ui/cli/) on redis docs.

### ENVIRONMENT

`NODE_ENV` : The node env for NodeJS (production, development or test). See [VueJS mode and env](https://cli.vuejs.org/guide/mode-and-env.html) docs or [NestJS configuration](https://docs.nestjs.com/techniques/configuration) docs.
`JWT_SECRET` : The secret for JWT. See [JWT Introduction](https://jwt.io/introduction) for more information.
`FRONT_PORT` : Port for the frontend.
`API_PORT` : Port or the backend.
`GAME_SOCKET_PORT` : Port for the Game Socket server.
`CHAT_SOCKET_PORT` : Port for the Chat Socket server.

### 42API

`API42_UID`, `API42_SECRET` : The credential for 42 API. See [42's API Guide](https://api.intra.42.fr/apidoc/guides/getting_started) for more information.

### OTHER

`HOST` : The Host using for request to the back or socket server. By default is the result of `hostname` bash command.

## License

Nest is [MIT licensed](LICENSE).
