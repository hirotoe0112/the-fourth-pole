FROM node:bookworm-slim
WORKDIR /usr/src

RUN npm install -g pnpm

RUN apt-get update && apt-get install -y git && apt-get install -y vim

RUN git clone https://github.com/hirotoe0112/the-fourth-pole.git
RUN cd the-fourth-pole && pnpm install

ARG GIT_NAME
ARG GIT_EMAIL
RUN git config --global user.name $GIT_NAME
RUN git config --global user.email $GIT_EMAIL

