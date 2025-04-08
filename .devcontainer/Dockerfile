FROM node:bookworm-slim

# Install modules
RUN apt-get update && apt-get install -y git && apt-get install -y vim
RUN apt-get install -y curl && apt-get install -y unzip

# AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION=ap-northeast-1

# Git
ARG GIT_NAME
ARG GIT_EMAIL
RUN npm install -g pnpm
RUN git config --global user.name $GIT_NAME
RUN git config --global user.email $GIT_EMAIL

# Application
WORKDIR /usr/src
RUN git clone https://github.com/hirotoe0112/the-fourth-pole.git
RUN cd the-fourth-pole && pnpm install
