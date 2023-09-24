FROM node:18-alpine as build
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD pnpm run start:prod