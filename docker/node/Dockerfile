FROM node:20-alpine AS common

WORKDIR /home/node/app

RUN npm install -g npm@10.1.0 \
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

FROM common AS build
COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm db:deploy \
	&& pnpm build

FROM common AS production
COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod

COPY --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
