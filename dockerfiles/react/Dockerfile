FROM nginx:latest

WORKDIR /app
COPY . /app/
RUN apt-get -y update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
RUN npm install
RUN npm run build
RUN cp -r ./build/* /usr/share/nginx/html/
