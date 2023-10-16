FROM node:20-alpine AS common
LABEL org.opencontainers.image.source=https://github.com/TheoZerbibi/ft_transcendence
LABEL org.opencontainers.image.description="Container image for ft_transcendence project"

WORKDIR /home/node/app

RUN npm install -g npm@latest \
	&& npm i -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

FROM common AS backend
COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .

RUN npm i -g @nestjs/cli \
	&& npm i -g prisma@latest \
	&& pnpm install

EXPOSE 3001

FROM common AS frontend

COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .
RUN npm i -g @vue/cli \
	&& pnpm install

EXPOSE 3000

FROM common AS socket

COPY --chown=node:node package.json .
COPY --chown=node:node prisma/ .

RUN npm i -g @nestjs/cli \
	&& pnpm install

EXPOSE 4000
EXPOSE 4001

FROM common AS build
ARG VITE_HOST=bess-f2r1s6.clusters.42paris.fr
ARG VITE_PORT=3000
ARG VITE_API_PORT=3001
ARG VITE_GAME_SOCKET_PORT=4000
ARG VITE_CHAT_SOCKET_PORT4001

COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .

RUN pnpm install --prod

COPY --chown=node:node . .

RUN pnpm build

RUN if [[ ! -d "./swagger-ui/" ]]; then mkdir -p swagger-ui; fi
RUN if [[ ! -d "./prisma/" ]]; then mkdir -p prisma; fi

FROM common AS production

COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/prisma ./prisma
COPY --chown=node:node --from=build /home/node/app/swagger-ui ./swagger-ui
