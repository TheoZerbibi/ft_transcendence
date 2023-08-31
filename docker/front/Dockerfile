FROM node:14-alpine AS build

RUN apk add --update npm

RUN mkdir /root/front

WORKDIR /root/front

#RUN npm install -g pnpm@6.14.3

RUN npm install -g create-vite

COPY ./vite/package*.json .

RUN npm ci

RUN npm build


#RUN npm create vite@latest transcendence --template vue


#WORKDIR /root/srcs/ls

#run npm install


#	RUN pnpm install vite vue
#	
#	RUN pnpm install




CMD ["tail", "-f", "/dev/null"]


#FROM nginx:alpine
#
#COPY --from=build  /root/front/ /usr/share/nginx/html
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]

#CMD ["pnpm", "dev"]
