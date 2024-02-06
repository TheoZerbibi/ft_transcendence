[![en](https://img.shields.io/badge/lang-en-pink.svg)](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/README.md)
[![fr](https://img.shields.io/badge/lang-fr-purple.svg)](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/README.fr.md)

<h1>FT_TRANSCENDENCE</h1>

## 🏓 Project Presentation

ft_transcendence is the final project of the Common Core at École 42.

The goal of this project is to consolidate the knowledge acquired throughout the curriculum to develop a web application, accessible from a modern web browser.

This application takes the form of a responsive Pong game, accessible only to students of École 42 via Oauth2 connection, and includes a user database.

## 🎨 Artistic Direction

For this project, we decided to draw inspiration from the game Omori.

Omori is a role-playing game (RPG) developed by the independent studio Omocat. Based on the webcomic series Omori by the director (Omocat), the game was released in December 2020. Featuring explicit themes such as anxiety and depression, the game contains elements of psychological horror.

This project thus pays homage to this work by adopting its graphic style and atmosphere. As a student project, it is not intended for commercialization. No profit will be made from this project. All copyrights are reserved to the Omocat studio.

## 📑 Specifications

The subject requires the following functionalities and technologies:

### 🔨 Tech / Frameworks

- `Nest.js` for the back-end
- `Typescript` in its most recent stable version for the front-end (framework choice is free)
- `PostgreSQL` for the database
- The website must be a single-page application (SPA)
- The site must be functional with the latest stable version of Google Chrome and another browser of our choice
- `Oauth2` for authentication

### 🔮 Features

- A Pong game
	- responsive
	- featuring a matchmaking system
	- recording user statistics to feed a leaderboard

- User profiles
	- hashed password
	- possibility to upload an avatar
	- match history
	- social network system:
		- adding/removing friends
		- blocking a user

- A real-time messaging application
	- direct messaging
		- online / offline status
		- challenging a friend to Pong
	- channels
		- ability for a user to create, join and/or leave a channel
		- moderation system (kick, ban, mute) reserved for administrators

## 💽 Usage

The project must be launched with the following command from the root directory:

```docker-compose up --build```

The site is accessible locally at the following address:

```http://localhost:3000```

## 📚 Stack

For our project, we chose the following stack:

| Description | Technology |
| ----------- | ----------- |
| **Back-end** | ![Static Badge](https://img.shields.io/badge/NestJS-Backend?logo=nestjs&color=%23E0234E&link=https%3A%2F%2Fnestjs.com%2F) |
| **Sockets** | ![Static Badge](https://img.shields.io/badge/NestJS-Backend?logo=nestjs&color=%23E0234E&link=https%3A%2F%2Fnestjs.com%2F)  ![Static Badge](https://img.shields.io/badge/Socket.io-Backend?logo=socketdotio&color=%23010101&link=https%3A%2F%2Fsocket.io%2F) |
| **Socket and Back-end Communication (Pub & Sub)** | ![Static Badge](https://img.shields.io/badge/Redis-white?logo=redis&logoColor=%23DC382D&link=https%3A%2F%2Fredis.com%2F) |
| **Database** | ![Static Badge](https://img.shields.io/badge/PostgreSQL-white?logo=postgresql&logoColor=%234169E1&link=https%3A%2F%2Fwww.postgresql.org%2F) |
| **ORM (Object-Relational Mapping)** | ![Static Badge](https://img.shields.io/badge/Prisma-%232D3748?logo=prisma&logoColor=%234169E1&link=https%3A%2F%2Fwww.prisma.io%2F) |
| **Front-end** | ![Static Badge](https://img.shields.io/badge/Vue.js-%231a1a1a?logo=vuedotjs&link=https%3A%2F%2Fvuejs.org%2F) ![Static Badge](https://img.shields.io/badge/Vuetify-%231867C0?logo=vuetify&link=https%3A%2F%2Fvuetifyjs.com%2Fen%2F) ![Static Badge](https://img.shields.io/badge/Vite-%231b1b1f?logo=vite&link=https%3A%2F%2Fvitejs.dev%2F