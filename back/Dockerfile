FROM node:20-alpine AS build

WORKDIR /home/node/app

RUN npm install -g npm@10.1.0 \
	&& npm i -g pnpm
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm db:deploy \
	&& pnpm build

FROM node:20-alpine AS production
COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
