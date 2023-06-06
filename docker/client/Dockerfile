FROM node:latest
WORKDIR /app
RUN apt-get update \
    && apt-get install -y
ENV LANG ja_JP.UTF-8ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm
# Vimインストール
RUN apt install -y vim