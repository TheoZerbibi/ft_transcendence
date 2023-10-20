FROM node:21-alpine AS common
LABEL org.opencontainers.image.source=https://github.com/TheoZerbibi/ft_transcendence
LABEL org.opencontainers.image.description="Container image for ft_transcendence project"

WORKDIR /home/node/app

RUN npm install -g npm@latest \
	&& npm i -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

FROM common AS backend
COPY package*.json .
COPY pnpm-lock.yaml .

RUN npm i -g @nestjs/cli \
	&& npm i -g prisma@latest \
	&& pnpm install

EXPOSE 3001

FROM common AS frontend

COPY package*.json .
COPY pnpm-lock.yaml .
RUN npm i -g @vue/cli \
	&& pnpm install

EXPOSE 3000

FROM common AS socket

COPY package.json .
COPY prisma/ .

RUN npm i -g @nestjs/cli \
	&& pnpm install

EXPOSE 4000
EXPOSE 4001
