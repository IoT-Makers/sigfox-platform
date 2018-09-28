FROM node:10-alpine
COPY . /home/app/backend
WORKDIR /home/app/backend
RUN npm install
ENTRYPOINT ["npm",  "start"]
