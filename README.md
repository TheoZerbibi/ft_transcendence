[![en](https://img.shields.io/badge/lang-en-pink.svg)](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/README.md)
[![fr](https://img.shields.io/badge/lang-fr-purple.svg)](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/README.fr.md)

<h1>FT_TRANSCENDENCE</h1>

## 🏓 Project Presentation

ft_transcendence is the final project of the Common Core at École 42.

The goal of this project is to consolidate the knowledge acquired throughout the curriculum to develop a web application, accessible from a modern web browser.

This application takes the form of a responsive Pong game, accessible only to students of École 42 via Oauth2 connection, and includes a user database.

## 🎨 Art Direction

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
| **Front-end** | ![Static Badge](https://img.shields.io/badge/Vue.js-%231a1a1a?logo=vuedotjs&link=https%3A%2F%2Fvuejs.org%2F) ![Static Badge](https://img.shields.io/badge/Vuetify-%231867C0?logo=vuetify&link=https%3A%2F%2Fvuetifyjs.com%2Fen%2F) ![Static Badge](https://img.shields.io/badge/Vite-%231b1b1f?logo=vite&link=https%3A%2F%2Fvitejs.dev%2F) ![Static Badge](https://img.shields.io/badge/p5.js-%23ED225D?logo=p5dotjs&link=https%3A%2F%2Fp5js.org%2F) |
| **Front-end Data Storage** | ![Static Badge](https://img.shields.io/badge/Pinia-%23ffd859?logo=pinia&link=https%3A%2F%2Fpinia.vuejs.org%2F) |

### NestJS

NestJS is an open-source JavaScript framework for back-end development. It is built on the Node.js platform and heavily inspired by the Angular front-end framework.

NestJS promotes the use of modular concepts and offers a robust architecture for building scalable applications.

NestJS is useful for:

- **Modular Structure**: NestJs encourages a modular organization of the code, making it easier to manage the different parts of the application.
- **TypeScript**: allows the use of TypeScript for development, offering benefits such as static type checking and better code maintainability.
- **Dependency Injection**: uses the principle of dependency injection to make the code more modular, testable, and extensible.
- **HTTP Support**: facilitates the creation of RESTful APIs or HTTP services with a system for managing routes and controllers.
- **WebSockets**: offers native support for websockets for real-time applications.
- **Middleware**: offers a middleware system for processing HTTP requests at different levels.
- **Integrated ORM**: integrates tools like TypeORM to simplify the management of relational databases.
- **AOP (Aspect-Oriented Programming)**: adopts some principles of aspect-oriented programming, allowing for better separation of concerns.
- **Extensibility**: allows the use of third-party libraries and offers flexibility for integrating other libraries and tools.

NestJS has a 3-layer architecture consisting of controllers, providers, and modules, enabling developers to create clean, non-overlapping code.

![NestJS Architecture and Workflow](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/Architecture-and-Workflow-of-NestJS.jpeg?raw=true)

### Sockets with NestJs and Sockets.io

Sockets (WebSockets) are a technology for bi-directional real-time communication between the client and the server. In the context of NestJS, Socket.io is a library that facilitates the implementation of WebSockets.

Utility:

- **Bidirectional Communication**: allows real-time data exchange between the client and the server in a bidirectional manner.
- **Real-time Applications**: ideal for applications requiring instant updates, such as chat and real-time gaming applications.
- **Data Pushing**: enables the server to send data to clients without them having to explicitly request it.
- **Notifications**: facilitates the implementation of real-time notifications for users.
- **Collaboration**: useful for applications that require real-time collaboration between multiple users.
- **Responsiveness**: offers increased responsiveness compared to traditional communication methods based on HTTP.
Integration with NestJS:
- **WebSocket Module**: NestJS offers a WebSocket module that simplifies the integration of WebSockets into the application.
- **@WebSocketGateway**: is a decorator used to define a WebSocket gateway that handles communication with clients.
- **@WebSocketServer**: allows injecting the WebSocket server instance into the application's components.
- **Connection Management**: allows managing connections, disconnections, and data exchanges between the server and clients.

#### Example of Use

In a real-time chat, the server can use sockets to instantly send messages to connected clients without them having to refresh the page.

Advantages of Socket.io:

- **Compatibility**: works across different browsers and platforms.
- **Automatic Reconnection**: automatically manages reconnection attempts in case of connection loss.

Limitations:

- **Firewall**: some firewalls and proxies may interfere with WebSocket connections.

![WebSocket Connection Lifecycle](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/cycledevieduneconnextionwebsocket.png?raw=true)

### Redis

Communication between sockets (via Sockets.io) and the back-end, using a Publish/Subscribe (Pub/Sub) system, can be implemented to enable efficient real-time communication.

**The Pub/Sub model is a messaging model where components of a system communicate without being directly coupled.** In this model, there are entities called 'publishers' that emit messages (publications) and entities called 'subscribers' that receive these messages (subscriptions).

#### Integration with the Back-end

- **Publisher**: The back-end can be configured as a message publisher in a Pub/Sub system. When an important event occurs (e.g., the reception of a new message in a chat application), the back-end publishes a message associated with that event. In the context of NestJS, it is possible to use custom events or specific mechanisms from Socket.io to publish messages.
- **Subscription**: The back-end can also subscribe to specific channels or events from other parts of the system. When an

 event to which the back-end is subscribed occurs (e.g., a chat message received from another part of the system), the back-end can react accordingly.

#### Integration with Sockets

- **Subscriber**: Client-side sockets can be configured as subscribers to these specific channels or events. When a message is published by the back-end, sockets that are subscribed to that particular channel will automatically receive that message.
- **Emitter**: Sockets can also act as emitters, publishing messages to the back-end to signal client-side events.

#### Example of Use

Imagine a real-time chat application:

When a user sends a new message, the back-end publishes a "new message" event. Client-side sockets that are subscribed to this event will automatically receive the message and be able to display it in real-time.

Advantages:

- This model promotes compartmentalization of components, improving the scalability and flexibility of the system.
- It allows asynchronous and real-time communication between different parts of the application.

Limitations:

- Implementing this model requires good management of channels, events, and messages to avoid performance and security issues.

![Example of Pub and Sub Mechanism](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/publish-subscribe-pattern.png?raw=true)

### PostgreSQL (Postgres)

PostgreSQL (or Postgres) is an open-source, high-performance relational database management system (RDBMS).

Unlike some other database management systems, it supports a large number of advanced features and is compliant with SQL standards. Its key features include:

- **Open Source**: PostgreSQL is distributed under an open-source license, meaning it is free to use, modify, and distribute.
- **Scalability**: supports extensions and offers an extensible architecture for adding additional features.
- **SQL Compliance**: PostgreSQL is compliant with ANSI SQL standards, ensuring high compatibility with other relational databases.
- **Data Types**: offers a variety of data types, including geospatial types, arrays, and the ability to define custom data types.
- **Referential Integrity**: supports referential integrity constraints, ensuring data consistency.
- **ACID Transactions**: ensures compliance with ACID properties (Atomicity, Consistency, Isolation, Durability) for transactions.
- **Advanced Indexing**: offers advanced indexing options to improve query performance.
- **Stored Functions and Triggers**: allows the creation of stored functions and triggers to automate repetitive tasks.
- **Replication**: supports replication to ensure system availability and resilience.
- **Security**: offers advanced security features, including fine-grained privilege management, encrypted connections, and user management.

#### Usage

PostgreSQL is widely used in a variety of applications, from small applications to large enterprises. It is commonly used as the primary database for web applications, geographic information systems (GIS), data warehouses, etc.

#### Administration Tools

Tools such as **pgAdmin** and **DataGrip** are often used to administer and interact with PostgreSQL databases.

#### Architecture of Our Database

![Database Architecture ft_transcendence](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/schemaprisma.png?raw=true)

### Prisma

Prisma is a modern **ORM** (Object-Relational Mapping) for databases.

It simplifies the interaction between applications and relational databases by providing a programming language interface (DSL) for defining the database schema and performing **CRUD** (Create, Read, Update, Delete) operations.

It supports multiple databases, including PostgreSQL, MySQL, SQLite, and SQL Server.

Key Features:

- **TypeScript and JavaScript**: Prisma supports TypeScript and JavaScript, allowing seamless integration with applications based on these languages.
- **Declarative Schema**: data models are defined declaratively in a file called "Prisma schema", offering a clear approach to describing the database structure.
- **Automatic Migrations**: Prisma supports automatic generation of migrations, simplifying the process of updating the database schema.
- **Query Safety**: Prisma offers protection against SQL injection attacks by using parameterized queries by default.
- **Model Relationships**: Allows easy definition of relationships between models, such as "one-to-one", "one-to-many", and "many-to-many" relationships.
- **Integration with Various Databases**: Prisma supports multiple databases, including PostgreSQL, MySQL, SQLite, and SQL Server.
- **Prisma Client**: Provides an automatically generated client that offers a type-safe API for interacting with the database.
- **Pagination and Filtering**: Facilitates the implementation of pagination and filtering in queries.

#### Usage

Prisma is used in back-end application development to simplify database operations.

It is often paired with frameworks such as Express.js (Node.js) or Fastify.

Prisma simplifies development with relational databases by offering clear syntax and a type-safe client for interacting with the database.

![Description of Prisma Architecture](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/prisma.png?raw=true)

###

 Vue.js

Vue 3 is a progressive and reactive JavaScript framework used for building user interfaces.

It is designed to be easy to integrate into existing projects and to be adopted incrementally.

- **Composition API**: Vue 3 introduces the *Composition API*, a new way to organize component logic. It offers better code reusability and more flexible state management.
- **Improved Performance**: Vue 3 has improved performance due to the redesign of the rendering engine. It is faster and more efficient, offering a responsive user experience.
- **Portal**: Vue 3 introduces the concept of portal, which facilitates the rendering of a component at a different place in the DOM, often useful for creating modals or pop-ups.

### Vuetify

Vuetify is a UI component library for Vue.js, built according to the principles of Google Material Design.

It offers an extensive collection of ready-to-use components to help developers build modern web applications.

- **Material Design**: Vuetify follows the design guidelines of Google's Material Design.
- **Responsive Grid**: Vuetify provides a responsive grid system that facilitates the creation of fluid and adaptable layouts for different screens.
- **Customizable Themes**: Vuetify themes are easily customizable, allowing developers to adjust the appearance of their applications as needed.
- **Ready-to-Use Components**: A wide variety of components such as buttons, sidebars, cards, etc., ready to use.

### Vite

Vite is a fast build tool for modern web applications.

It is designed to work with Vue.js, React, and other frameworks. It offers a fast development experience by utilizing native ESM (ECMAScript Modules) technology.

- **Rapid Development**: Vite offers a fast development experience with near-instant startup time, facilitating rapid iterations.
- **ESM Modules**: Vite leverages native ECMAScript modules to speed up development and enable features like hot module replacement (HMR).
- **Vue3 Support**: Vite was created with Vue 3 in mind, making it a natural choice for projects using Vue.js.
- **Integration with Vuetify and Vue3**: Vite can be easily integrated with Vue 3 and Vuetify, providing an optimized setup for smooth development.

Combining Vue 3, Vuetify, and Vite provides a powerful ecosystem for modern web application development with a seamless development experience and aesthetically pleasing and functional user interfaces.

![](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/vuevitepinia.png?raw=true)

[Create a new Vue3 project with Vite, Vuetify 3, Router and Typescript](https://www.youtube.com/watch?app=desktop&v=To5XzHlTS_E)

### Pinia

Pinia is a global state management system for Vue 3.

It offers reactive and efficient state management for Vue.js applications using a simple and declarative approach.

- **Reactive State**: Pinia uses the reactivity of Vue 3 to create a global state that can be reactive, allowing automatic updating of components when a state change occurs.
- **Simplicity and Declarativeness**: Pinia is distinguished by its simplicity. The minimal configuration required allows for quick adoption and a declarative declaration of the state.
- **Support for Asynchronous Actions**: Pinia natively supports asynchronous actions, facilitating the management of asynchronous operations such as API calls.
- **Devtools**: Pinia offers development tools that allow tracking and debugging the application's state using Vue's development tools.
- **Support for Vue2**: Although designed for Vue 3, Pinia also offers a version for Vue 2.

With Pinia, you can manage global state reactively in your Vue 3 applications. It offers a lightweight and efficient alternative for global state management.

![Pinia Workflow Diagram](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/piniaworkflow.png?raw=true)

![VueEx Architecture](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/archivuejex.png?raw=true)

## 📎 Concepts

### Full Stack Development

Concerns the creation of complete web applications and covers:

- The front-end (user interface)
- The back-end (server logistics and database management)

It allows for managing the entire application development process.
Here the project consists of recreating a website with a beautiful user interface, offering an online and multiplayer pong game, and a chat service.

![Example of a Full Stack Development Diagram](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/Exemple%20de%20sch%C3%A9ma%20d%E2%80%99un%20d%C3%A9veloppement%20full%20stack.png?raw=true)

### Front-end

It is the visible part of a web application with which

 the user directly interacts.
It is generally developed using technologies like HTML, CSS, and JavaScript.
The front-end provides an interactive and user-friendly experience.

### Back-end

It is the invisible part of a web application that manages server-side functionalities, processes data, and communicates with the database.
It handles business logistics and ensures efficient data management and security.

### Database

It is a structured data storage system that allows for storing, organizing, and retrieving information.
The database stores data in an organized manner so that the application can quickly and efficiently retrieve it.

### API (Application Programming Interface)

It is a set of rules and protocols that allow different applications to communicate with each other.
It facilitates integration between the front-end and back-end, as well as between different applications.

### Framework

It is a set of tools and conventions that facilitate development by providing a pre-established structure.
It accelerates the development process by avoiding recreating common functionalities from scratch.

### Git, Version Control

It is a system that records changes to a project's source code over time.
It allows tracking changes, collaborating effectively, and reverting to previous versions if necessary.

### Deployment

It is the process of making an application live so that it is accessible to end users.
It makes the application available and ready for use.

## 🤝 Contributors

<a href="https://github.com/TheoZerbibi/ft_transcendence/graphs/contributors">
  <img align="center" src="https://contrib.rocks/image?repo=TheoZerbibi/ft_transcendence" />
</a>