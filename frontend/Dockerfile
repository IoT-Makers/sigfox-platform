FROM node:10-alpine as builder

WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY ./ /frontend/

ARG BUILD_ENV
ARG API_URL
ARG API_VERSION
ARG PRIMUS_URL
ARG SERVER_NAME

RUN npm run set-env && ./node_modules/.bin/ng build --$BUILD_ENV

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/dist/ /usr/share/nginx/html
RUN sed -i "s#localhost#${SERVER_NAME}#" /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf

#FROM nginx:alpine
## COPY nginx.conf /etc/nginx/nginx.conf
## WORKDIR /usr/share/nginx/html
## COPY dist/ .
#COPY dist/ /usr/share/nginx/html
