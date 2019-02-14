FROM node:10-alpine as builder

WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY ./ /frontend/

ARG BUILD_ENV
ARG API_URL
ARG API_VERSION
ARG PRIMUS_URL

RUN npm run set-env && ./node_modules/.bin/ng build --$BUILD_ENV


FROM nginx:alpine
RUN apk add --no-cache curl

ARG SERVER_NAME

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD curl --silent --fail localhost/nginx-health || exit 1

COPY server/nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s#localhost#${SERVER_NAME:-localhost}#" /etc/nginx/nginx.conf
COPY --from=builder /frontend/dist/ /usr/share/nginx/html

#FROM nginx:alpine
## COPY nginx.conf /etc/nginx/nginx.conf
## WORKDIR /usr/share/nginx/html
## COPY dist/ .
#COPY dist/ /usr/share/nginx/html
