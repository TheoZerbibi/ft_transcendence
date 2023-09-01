FROM node:18.14-alpine AS common

WORKDIR /home/node/app

RUN npm i -g pnpm

FROM common AS backend

COPY package.json .
RUN npm i -g @nestjs/cli \
  && pnpm install \
  && pnpm db:migrate

EXPOSE 3001

FROM common AS frontend
COPY package.json .

RUN pnpm install
EXPOSE 3000
