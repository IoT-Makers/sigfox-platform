FROM node:10-alpine
RUN apk add --no-cache curl

HEALTHCHECK --interval=10s --timeout=2s --retries=3 \
  CMD curl --silent --fail 'http://localhost:2333/primus?access_token=healthcheck&transport=polling' || exit 1

WORKDIR /primus
COPY package*.json /primus/
RUN npm install
COPY ./ /primus/