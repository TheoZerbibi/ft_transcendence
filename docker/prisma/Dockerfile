FROM node:18.14-alpine

WORKDIR /home/node/app

RUN mkdir src && touch src/main.ts \
	&& mkdir -p ./prisma

COPY ./docker/prisma/tsconfig.json .
COPY ./docker/prisma/package.json .
COPY ./docker/prisma/schema.prisma ./prisma/schema.prisma

RUN npm i -g pnpm && \
	pnpm install

EXPOSE 5555
