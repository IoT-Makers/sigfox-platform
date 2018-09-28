FROM node:10 as builder
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY ./ /frontend/
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/dist/ /usr/share/nginx/html
