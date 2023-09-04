FROM node:18-alpine AS base

WORKDIR /app
RUN npm install -g @nestjs/cli

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ENTRYPOINT ["yarn", "start:dev"]
