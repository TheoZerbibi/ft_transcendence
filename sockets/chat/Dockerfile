FROM node:20-alpine AS common
LABEL org.opencontainers.image.source=https://github.com/TheoZerbibi/ft_transcendence
LABEL org.opencontainers.image.description="Container image for ft_transcendence project"

WORKDIR /home/node/app

RUN npm install -g npm@latest \
	&& npm i -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

FROM common AS build

COPY --chown=node:node package*.json .
COPY --chown=node:node pnpm-lock.yaml .

RUN pnpm install --prod

COPY --chown=node:node . .

RUN npm i -g @nestjs/cli \
	&& pnpm build

FROM common AS production

COPY --chown=node:node --from=build /home/node/app/package*.json .
COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/prisma ./prisma
