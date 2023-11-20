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

FROM common AS build
ARG VITE_HOST
ARG VITE_PORT
ARG VITE_API42_UID
ARG VITE_API42_SECRET
ARG VITE_API_PORT
ARG VITE_GAME_SOCKET_PORT
ARG VITE_CHAT_SOCKET_PORT

COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .

RUN pnpm install --prod

COPY --chown=node:node . .

RUN pnpm build

FROM common AS production

COPY --chown=node:node --from=build /home/node/app/package*.json .
COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
