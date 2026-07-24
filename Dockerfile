FROM node:22-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml* ./
RUN yarn install --immutable

COPY . .
RUN yarn prepare && yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
