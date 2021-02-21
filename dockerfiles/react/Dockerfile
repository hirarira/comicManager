FROM node:latest

WORKDIR /app
COPY package* /app/
COPY tsconfig.json /app/
COPY ./public/ /app/public/
COPY ./src/ /app/src/
RUN npm install
RUN npm run build
RUN ls -la ./build
RUN cp -r ./build/ /usr/share/build/
RUN ls -la /usr/share/build/
