FROM node:10-alpine
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY ./ /backend/
ARG GIT_REV
ENV GIT_REV $GIT_REV


