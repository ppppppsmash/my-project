FROM node:latest
WORKDIR /app
RUN npm install -g pnpm
RUN apt-get update \
    && apt-get install -y
RUN apt install -y vim