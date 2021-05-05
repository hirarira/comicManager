FROM nginx:latest

# init nginx
WORKDIR /app
COPY ./default.conf /etc/nginx/conf.d/
RUN ls -la /usr/share/nginx/html/

# install node & npm
RUN apt-get -y update
RUN apt-get install -y \
    curl \
    gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN npm install npm@latest -g
RUN npm -v

# build React
COPY package* /app/
COPY tsconfig.json /app/
COPY ./public/ /app/public/
COPY ./src/ /app/src/
RUN npm install
RUN npm run build
RUN cp -r ./build/ /usr/share/build/
