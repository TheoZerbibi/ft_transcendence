FROM node:20-alpine

WORKDIR /home/node/app

RUN npm install -g npm@10.1.0
RUN mkdir src && touch src/main.ts \
	&& mkdir -p ./prisma

COPY ./docker/prisma/*.json .
COPY ./docker/prisma/schema.prisma ./prisma/schema.prisma

RUN npm i -g pnpm && \
	pnpm install

EXPOSE 5555
