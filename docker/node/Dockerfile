<<<<<<< HEAD
FROM node:21-alpine AS common
=======
FROM node:20-alpine AS common
>>>>>>> c80165e (fix: github issue)
LABEL org.opencontainers.image.source=https://github.com/TheoZerbibi/ft_transcendence
LABEL org.opencontainers.image.description="Container image for ft_transcendence project"

WORKDIR /home/node/app

RUN npm install -g npm@latest \
	&& npm i -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

FROM common AS backend
<<<<<<< HEAD
COPY package*.json .
COPY pnpm-lock.yaml .
=======
COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .
>>>>>>> c80165e (fix: github issue)

RUN npm i -g @nestjs/cli \
	&& npm i -g prisma@latest \
	&& pnpm install

EXPOSE 3001

FROM common AS frontend

<<<<<<< HEAD
COPY package*.json .
COPY pnpm-lock.yaml .
=======
COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .
>>>>>>> c80165e (fix: github issue)
RUN npm i -g @vue/cli \
	&& pnpm install

EXPOSE 3000

FROM common AS socket

<<<<<<< HEAD
COPY package.json .
COPY prisma/ .
=======
COPY --chown=node:node package.json .
COPY --chown=node:node prisma/ .
>>>>>>> c80165e (fix: github issue)

RUN npm i -g @nestjs/cli \
	&& pnpm install

EXPOSE 4000
EXPOSE 4001
