# TRANSCENDENCE

## Présentation du Projet

ft_transcendence est le dernier projet du Tronc Commun (Common Core) de l'école 42.

L'objectif de ce projet est de rassembler les connaissances acquises tout au long du cursus pour développer une application web, accessible depuis un navigateur web moderne.

Cette application prend la forme d'un jeu de Pong responsive, accessible seulement aux étudiants de l'école 42 via une connexion Oauth2, et comprenant une base de donnée utilisateur.

## Direction Artistique

Pour ce projet, nous avons décidé de nous inspirer du jeu Omori.

Omori est un jeu vidéo de rôle (RPG) développé par le studio indépendant Omocat. Basé sur la série webcomic Omori de la réalisatrice (Omocat, ndlr), le jeu est sorti en décembre 2020. Mettant explicitement en scène des thèmes tels que l'anxiété et la dépression, le jeu comporte des éléments d'horreur psychologique.

Ce projet rend donc homage à cette oeuvre, en reprenant son style graphique et son ambiance. S'agissant d'un projet d'étudiant, il n'a pas vocation a être commercialisé. Aucun profit ne sera tiré de ce projet. Tous les droits d'auteur sont réservés au studio Omocat.

## Cahier des Charges

Le sujet requiert les fonctionnalités et technologies suivantes:

### Techno / frameworks

- `Nest.js` pour le back-end
- `Typescript` dans sa version stable la plus récente pour le front (choix du framework libre)
- `PostgreSQL` pour la base de données
- Le site web doit être une application monopage (SPA - Single Page Application)
- Le site doit pouvoir fonctionner avec la dernière version stable de Google Chrome et un autre navigateur de notre choix
- `Oauth2` pour l'authentification

### Fonctionnalités

- Un jeu de Pong
	- responsive
	- comportant un systeme de matchmaking
	- enregistrant les statistiques des utilisateurs pour nourrir un leaderboard

- Des profils utilisateur
	- mot de passe hashé
	- possibilité d'uploader un avatar
	- historique des matchs
	- système de réseau social:
		- ajouter/supprimer des amis
		- bloquer un utilisateur

- Une application de messagerie en temps réel
	- messagerie directe
		- statut en ligne / hors ligne
		- challenger un ami au Pong
	-  salons
		- possibilité pour un utilisateur de créer, joindre et/ou quitter un channel
		- système de modération (kick, ban, mute) réservé aux administrateurs


## Utilisation

Le projet doit être lancé avec la commande suivante depuis la racine du repertoire:

```docker-compose up --build```

Le site est accessible en local depuis l'adresse suivante:

```http://localhost:3000```

## Stack

Pour notre projet nous avons choisi la stack suivantes:

| Description | Technologie |
| ----------- | ----------- |
| **Back-end** | ![Static Badge](https://img.shields.io/badge/NestJS-Backend?logo=nestjs&color=%23E0234E&link=https%3A%2F%2Fnestjs.com%2F) |
| **Sockets** | ![Static Badge](https://img.shields.io/badge/NestJS-Backend?logo=nestjs&color=%23E0234E&link=https%3A%2F%2Fnestjs.com%2F)  ![Static Badge](https://img.shields.io/badge/Socket.io-Backend?logo=socketdotio&color=%23010101&link=https%3A%2F%2Fsocket.io%2F) |
| **Communication Sockets et Back-end (Pub & Sub)** | ![Static Badge](https://img.shields.io/badge/Redis-white?logo=redis&logoColor=%23DC382D&link=https%3A%2F%2Fredis.com%2F) |
| **Base de données** | ![Static Badge](https://img.shields.io/badge/PostgreSQL-white?logo=postgresql&logoColor=%234169E1&link=https%3A%2F%2Fwww.postgresql.org%2F) |
| **ORM (Object-Relationnal Mapping / Mapping Objet-Relationnel)** | ![Static Badge](https://img.shields.io/badge/Prisma-%232D3748?logo=prisma&logoColor=%234169E1&link=https%3A%2F%2Fwww.prisma.io%2F) |
| **Front-end** | ![Static Badge](https://img.shields.io/badge/Vue.js-%231a1a1a?logo=vuedotjs&link=https%3A%2F%2Fvuejs.org%2F) ![Static Badge](https://img.shields.io/badge/Vuetify-%231867C0?logo=vuetify&link=https%3A%2F%2Fvuetifyjs.com%2Fen%2F) ![Static Badge](https://img.shields.io/badge/Vite-%231b1b1f?logo=vite&link=https%3A%2F%2Fvitejs.dev%2F) ![Static Badge](https://img.shields.io/badge/p5.js-%23ED225D?logo=p5dotjs&link=https%3A%2F%2Fp5js.org%2F) |
| **Stockage de données front-end** | ![Static Badge](https://img.shields.io/badge/Pinia-%23ffd859?logo=pinia&link=https%3A%2F%2Fpinia.vuejs.org%2F) |

### NestJS

C’est un framework javascript open source destiné au développement back-end. Il est construit sur la plateforme Node.js et s’inspire fortement du framework Angular pour le développement front-end.

NestJS favorise l’utilisation de concepts modulaires et offre une architecture robuste pour la construction d’applications évolutives.

NestJS est utile pour:

- **Structure modulaire**: NestJs encourage une organisation modulaire du code, facilitant la gestion des différentes parties de l’application
- **TyeScript**: permet l’utilisation de TypeScript pour le développement, offrant des avantages tels que la vérification statique des types et une meilleure maintenabilité du code.
- **Injection de dépendances**: utilise le principe d’injection de dépendances pour rendre le code plus modulaire, testable et extensible.
- **Support HTTP**: facilite la création d’API RESTful ou de services HTTP grâce à un système de gestion des routes et des contrôleurs.
- **WebSockets**: propose une prise en charge native des websockets pour les applications en temps réel
- **Middleware**: offre un systèe de middleware pou le traitement des requêtes HTTP à différents niveaux
- **ORM intégré**: intègre des outils conne TypeORm pour simplifier la gestion des bases de données relationnelles.
- **AOP (Aspect Oriented Programming)**: adopte certains principes de la programmation orientée aspect, permettant une meilleure séparation des préoccupations
- **Extensibilité**: permet l’utilisation de bibliothèques tierees et offre une flexibilité pour l’intégration d’autres bibliothèques et outils

NestJS dispose d'une architecture à 3 couches composée de contrôleurs, de fournisseurs et de modules.

Les développeurs peuvent ainsi créer un code propre qui ne se chevauche pas.

![Architecture et flux de travail NestJS](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/Architecture-and-Workflow-of-NestJS.jpeg?raw=true)

### Sockets avec NestJs et Sockets.io

Les sockets (WebSockets) sont une technologie de communication bidirectionnelle en temps réel entre le client et le serveur. Dans le contexte de NestJS, Socket.io est une bibliothèque qui facilite la mise en oeuvre des WebSockets.

Utilité:

- **Communication bidirectionnelle**: permet l’échange de données en temps réel entre le client et le serveur de manière bidirectionnelle.
- **Applications en temps réel**: idéal pour les applications nécessitant des mises à jour instantanées, telles que les applications de chat et de jeux en temps réel.
- **Push de données**: permet au serveur d’envoyer des données aux clients sans qu’ils aient à demander explicitement
- **Notifications**: facilite la mis en place de notifications en temps réel pour les utilisateurs
- **Collaboration**: utile pour les applications qui nécessitent une collaboration en temps réel entre plusieurs utilisateurs
- **Réactivité**: offre une réactivité accrue par rapport aux méthodes traditionnelles de communication basées sur HTTP
Intégration avec NestJS:
- **module WebSocket**: NestJS propose un module WebSocket qui simplifie l’intégration des WebSockets dans l’application
- **@WebSocketGateway**: c’est un décorateur utilisé pour définir une passerelle WebSocket qui gère la communication avec les clients.
- **@WebSocketServer**: permet d’injecter l’instance du serveur WebSocket dans les composants de l’application
- **Gestion des connexions**: permet la gestion des connexions, déconnexions et échanges de données entre le serveur et les clients

#### Exemple d’utilisation

Dans un chat en temps réel, le serveur peut utiliser des sockets pour envoyer instantanément les messages aux clients connectés sans qu’ils aient à actualiser la page

Avantages de Socket.io:

- **Compatibilité**: fonctionne sur différents navigateurs et plate-formes
- **Reconnexion automatique**: gère automatiquement les tentatives de reconnexion en cas de perte de connexion

Limites:

- **Firewall**: certains pare-feu et proxys peuvent interférer avec les connexions WebSockets


![Cycle de vie d’une connexion WebSocket](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/cycledevieduneconnextionwebsocket.png?raw=true)

### Redis

La communication entre les sockets (via Sockets.io) et le back-end, en utilisant un système de publication/abonnement (Pub/Sub - Publish/Subscribe), peut être mise en oeuvre pour permettre une communication efficace en temps réel.

**Le modèle Pub/Sub est un modèle de messagerie où les composants d’un système communiquent entre eux sans être directement couplés.** Dans ce modèle, il y a des entités appelées ‘publishers’ qui émettent des messages (publications) et des entités appelées ‘subscribers’ qui reçoivent ces messages (abonnements)

#### Intégration avec le Back-end

- **Publisher (émetteur)**: Le backend peut être configuré comme un émetteur de messages (publisher) dans un système Pub/Sub. Lorsqu’un évènement important se produit (par exemple la réception d’un nouveau message dans une application de chat), le back-end publie un message associé à cet évènement. Dans le contexte de NestJS, il est possible d'utiliser des évènements personnalisés ou des mécanismes spécifiques à Socket.io pour publier des messages.
- **Abonnement**: Le back-end peut également s’abonner à des canaux spécifiques ou des évènements provenant d’autres parties du système. Lorsqu’un évènement auquel le back-end est abonné se produit (par exemple un message du chat reçu d’une autre partie du système), le back-end peut réagir en conséquence.

#### Intégration avec les Sockets

- **Subscriber (abonné)**: Les sockets côté client peuvent être configurées comme des abonnés de ces anaux ou évènements spécifiques. Lorsqu’un message est publié par le back-end, les sockets qui sont abonnées à ce canal particulier recevront automatiquement ce message.
- **Emetteur:** Les sockets peuvent également agir comme émetteur publiant des messages vers le back-end pour signaler des évènements du côté du client.

#### Exemple d’utilisation

Imaginons une application de chat en temps réel:

Lorsqu’un utilisateur envoie un nouveau message, le back-end publie un évènement “nouveau message”. Les sockets côté client qui sont abonnnés à cet évènement recevront automatiquement le message et pourront l’afficher en temps réel.

Avantages:

- Ce modèle favorise la compartementalisation des composants, améliorant ansi l'évolutivité et la flexibilité du système.
- Il permet une communication asynchone et en temps réel entre différentes parties de l’application.

Limites:

- La mise en oeuvre de ce modèle nécessite une bonne gestion des canaux, évènements et des messages pour éviter des problème de performance et de sécurité.

![Exemple de méchanisme Pub and Sub](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/publish-subscribe-pattern.png?raw=true)

### PostgreSQL (Postgres)

PostgreSQL (ou Postgres) est un système de gestion de base de données relationnelles (SGBDR) open source et performant.

Contrairement à certains autres systèmes de gestion de base de données, il prend en charge un grand nombre de fonctionnalités avancées et est conforme aux normes SQL. Ses caractéristiques clés sont les suivantes:

- **Open source**: PostgreSQL est distribué sous une licence open source, ce qui signifie qu’il est gratuit à utiliser, modifier et distribuer.
- **Extensibilité**: il prend en charge les extensions et offre une architecture extensible permettant d’ajouter des fonctionnalités supplémentaires.
- **Conformité SQL**: PostgreSQL est conforme aux normes SQL ANSI, garantissant une compatibilité élevée avec d’autres bases de données relationnelles.
- **Type de données**: propose une variété de types de données, y compris des types géospatiaux, des tableaux, la possibilité de définir des types de données personnalisés.
- **Intégrité référentielle**: prend en charge les contraintes d’intégrité référentielle, garantissant la cohérence des données.
- **Transactions ACID**: assure la conformité aux propriétés ACID (Atomicité, Cohérence, Isolation, Durabilité) pour les transactions.
- **Indexation avancée**: offre des options d’indexation avancée pour améliorer les performances des requêtes.
- **Fonctions stockées et déclencheurs**: permet la création de fonctions stockées et de déclencheurs pour automatiser les tâches répétitives.
- **Réplication**: prise en charge de la réplication pour garantir la dispoibilité et la résilience du système.
- **Sécurité**: offre des fonctionnalités de sécurité avancées, y compris la gestion fine des privilèges, les connexions chiffrées et la gestion des utilisateurs.

#### Utilisation

PostgreSQL est largement utilisé dans une variété d’applications, des petites applications aux grandes entreprises. Il est couramment utilisé comme base de données principale pour les applications web, les systèmes d’information géographique (SIG), les entrepôts de données, etc.. .

#### Outils d’administration

Des outils comme **pgAdmin** et **DataGrip** sont souvent utilisés pour administrer et intéragir avec les bases de données PostgreSQL.

#### Architecture de notre base de données

![Architecture base de données ft_transcendence](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/schemaprisma.png?raw=true)

### Prisma

Prisma est un **ORM** (Object-Relational Mapping) moderne pour les bases de données.

Il simplifie l'interaction entre les applications et les bases de données relationnelles en fournissant une interface de programmation en langage de programmation (DSL) permettant de définir le schéma de la base de données et d'effectuer des opérations **CRUD** (Create, Read, Update, Delete).

Il prend en charge plusieurs bases de données, y compris PostgreSQL, MySQL, SQLite et SQL Server

Caractéristiques clés:

- **TypeScript et JavaScript**: Prisma prend en charge TypeScript et JavaScript, ce qui permet une intégration transparente avec des applications basées sur ces langages.
- **Schéma déclaratif**: les modèles de données sont définis de manière déclarative dans un fichier appelé “schéma prisma”, offrant une approche claire pour décrire la structure de la base de données.
- **Migrations automatiques**: Prisma prend en charge la génération automatique de migrations, simplifiant le processus de mise à jour du schéma de la base de données.
- **Sécurité des requêtes**: Prisma offre une protection contre les attaques par injection SQL en utilisant des requêtes paramétrées par défaut.
- **Relation entre modèles**: Permet de définir facilement des relations entre les modèles, comme les relations de type "one-to-one", "one-to-many" et "many-to-many".
- **Intégration avec diverses BDD**: Prisma prend en charge plusieurs bases de données, y compris PostgreSQL, MySQL, SQLite et SQL Server.
- **Prisma client**: Fournit un client généré automatiquement qui offre une API type-safe pour interagir avec la base de données.
- **Pagination et filtrage**: Facilite la mise en œuvre de la pagination et du filtrage dans les requêtes.

#### Utilisation

Prisma est utilisé dans le développement d’applications back-end pour simplifier les opérations de base de données.

Il est souvent associé à des frameworks tels que Express.js (Node.js) ou Fastify.

Prisma simplifie le développement avec des bases de données relationnelles en offrant une syntaxe claire et un client type-safe pour interagir avec la base de données.

![Description de l’architecture Prisma](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/prisma.png?raw=true)

### Vue.js

Vue 3 est un framework JavaScript progressif et réactif utilisé pour la construction d'interfaces utilisateur.

Il est conçu pour être facile à intégrer dans des projets existants et à adopter de manière incrémentale.

- **Composition API**: Vue 3 introduit la *Composition API*, une nouvelle façon d'organiser la logique d'un composant. Elle offre une meilleure réutilisabilité du code et une gestion plus flexible de l'état.
- **Performances améliorées**: Vue 3 a des performances améliorées grâce à la refonte du moteur de rendu. Il est plus rapide et plus efficace, offrant une expérience utilisateur réactive.
- **Portail**: Vue 3 introduit la notion de portail qui facilite le rendu d'un composant à un endroit différent dans le DOM, souvent utile pour la création de modales ou de pop-ups.

### Vuetify 

Vuetify est une bibliothèque de composants UI pour Vue.js, construite conformément aux principes du Google Material Design.

Elle offre une collection étendue de composants prêts à l'emploi pour aider les développeurs à construire des applications web modernes.

- **Material Design**: Vuetify suit les design guidelines du Material Design de Google.
- **Grille responsive**: Vuetify fournit une grille responsive qui facilite la création de mises en page fluides et adaptables à différents écrans.
- **Thèmes personnalisables**: Les thèmes de Vuetify sont facilement personnalisables, permettant aux développeurs d'ajuster l'apparence de leurs applications en fonction des besoins.
- **Composants prêts à l’emploi**: Une grande variété de composants tels que des boutons, des barres latérales, des cartes, etc.., prêts à l'emploi.

### Vite

Vite est un outil de construction rapide pour les applications web modernes.

Il a été conçu pour fonctionner avec Vue.js, React, et d'autres frameworks. Il offre une expérience de développement rapide en utilisant la technologie de module native d'ESM (ECMAScript Modules).

- **Développement rapide**: Vite offre une expérience de développement rapide avec un temps de démarrage quasi instantané, facilitant les itérations rapides.
- **Modules ESM**: Vite exploite les modules ECMAScript natifs pour accélérer le développement et la mise en œuvre des fonctionnalités comme le hot module replacement (HMR).
- **Prise en charge de Vue3**: Vite a été créé en tenant compte de Vue 3, ce qui en fait un choix naturel pour les projets utilisant Vue.js.
- **Intégration avec Vuetify et Vue3**: Vite peut être facilement intégré avec Vue 3 et Vuetify, fournissant une configuration optimisée pour un développement fluide.

En combinant Vue 3, Vuetify, et Vite, vous obtenez un écosystème puissant pour le développement d'applications web modernes avec une expérience de développement fluide et des interfaces utilisateur esthétiques et fonctionnelles.

![](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/vuevitepinia.png?raw=true)

[Create a new Vue3 project with Vite, Vuetify 3, Router and Typecript](https://www.youtube.com/watch?app=desktop&v=To5XzHlTS_E)

### Pinia

Pinia est un système de gestion d'état global (global state management system) pour Vue 3.

Il offre une gestion de l'état réactive et performante pour les applications Vue.js en utilisant une approche simple et déclarative.

- **Etat réactif**: Pinia utilise la réactivité de Vue 3 pour créer un état global qui peut être réactif, permettant une mise à jour automatique des composants lorsqu'un changement d'état se produit.
- **Simplicité et déclarativité**: Pinia se distingue par sa simplicité. La configuration minimale nécessaire permet une prise en main rapide et une déclaration déclarative de l'état.
- **Prise en charge des actions asynchrones**: Pinia prend en charge naturellement les actions asynchrones, facilitant la gestion des opérations asynchrones telles que les appels API.
- **Devtools**: Pinia offre des outils de développement qui permettent de suivre et de déboguer l'état de l'application à l'aide des outils de développement de Vue.
- **Prise en carge de Vue2**: Bien que conçu pour Vue 3, Pinia propose également une version pour Vue 2.

Avec Pinia, vous pouvez gérer l'état global de manière réactive dans vos applications Vue 3. Il offre une alternative légère et performante pour la gestion de l'état global.

![Diagramme du workflow de Pinia](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/piniaworkflow.png?raw=true)

![Architecture VueEx](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/archivuejex.png?raw=true)

## Notions

### Développement full stack

Concerne la création d’applications web complètes et couvre:

- Le front-end (l’interface utilisateur)
- Le back-end (logistique serveur et base de données)

Il permet de gérer l’ensemble du processus de développement d’une application.
Ici le projet consiste à recréer un site web avec une belle interface utilisateur, offrant un jeu de pong en ligne et multijoueurs et un service de chat.

![Exemple de schéma d’un développement full stack](https://github.com/TheoZerbibi/ft_transcendence/blob/core/production/.img/Exemple%20de%20sch%C3%A9ma%20d%E2%80%99un%20d%C3%A9veloppement%20full%20stack.png?raw=true)

### Front-end

C’est la partie visible d’une application web avec laquelle l’utilsateur intéragit directement. 
Elle est généralement développée en utilisant des technologies comme HTML, CSS et JavaScript.
Le front-end permet d’offrir une expérience utilisateur interactive et conviviale.

### Back-end

C’est la partie invisible d’une application web qui gère les fonctionnalités côté serveur, traite les données et communique avec la base de données.
Il gère la logistique métier et garantit la sécurité et la gestion efficace des données.

### Base de données

C’est un système de stockage de données structurées qui permet de stocker, organiser et récupérer des informations.
La base de données stocke les données de manière organisée pour que l’application puisse les récupérer rapidement et efficacement

### API (Application Programming Interface / Interface de Programmation d’Applications)

C’est un ensemble de règles et de protocoles qui permettent à différentes applications de communiquer entre elles.
Elle facilite l’intégration entre le front-end et le back-end, ainsi qu’entre différentes applications

### Framework

C’est un ensemble d’outils et de conventions qui facilitent le développement en fournissant une structure préétablie.
Il accélère le processus de développement en évitant de recréer des fonctionnalités communes à partir de zéro.

### Git, contrôle de version

C’est un système qui enrgistre les modifications apportées au code source d’un projet au fil du temps.
Il permet de suivre les modifications, de collaborer efficacement et de revenir à des versions antérieures si nécessaire.

### Déploiement

C’est le processus de mise en ligne d’une application afin qu’elle soit accessible aux utilisateurs finaux.
Il rend l’application disponible et prête à être utilisée.

## AUTHORS

- [Théo Zeribi](https://github.com/TheoZerbibi)
- [Noémi Fauconnier](https://github.com/nfauconn)
- [Gaëlle Rannou](https://github.com/Kyubie)
- [Ismael Guidadou](https://github.com/Noob3vol)
- [Semiha Beyazkilic](https://github.com/semx2a)
