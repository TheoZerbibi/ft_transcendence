FROM node:18.14-alpine AS common

WORKDIR /home/node/app

RUN npm i -g pnpm

FROM common AS backend
COPY package.json .
RUN npm i -g @nestjs/cli

EXPOSE 3001
CMD [ "pnpm", "install"]

FROM common AS frontend
COPY package.json .
RUN npm i -g @vue/cli

EXPOSE 3000
CMD [ "pnpm", "install"]
