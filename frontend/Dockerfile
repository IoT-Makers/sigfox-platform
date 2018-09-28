FROM nginx
RUN apt-get update -y
RUN apt-get install -y curl \
                       libcurl3 \
                       libcurl3-dev \
                       ngrep \
                       gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs build-essential

COPY . /home/app/frontend
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /home/app/frontend
RUN npm install
RUN ./node_modules/.bin/ng build --$BUILD_ENV

WORKDIR /usr/share/nginx/html
RUN mv /home/app/frontend/dist/* .
RUN rm -r /home/app/frontend

