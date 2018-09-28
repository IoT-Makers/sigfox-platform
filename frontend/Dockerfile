#FROM node:10 as builder
#WORKDIR /frontend
#COPY package*.json /frontend/
#RUN npm install
#COPY ./ /frontend/
#RUN npm run set-env && ./node_modules/.bin/ng build --prod

#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=builder /frontend/dist/ /usr/share/nginx/html

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/ .
