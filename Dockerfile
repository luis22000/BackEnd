FROM node:10


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install
RUN npm install express
RUN npm install redis

COPY . .

EXPOSE 3001
EXPOSE 6379
EXPOSE 27017
CMD [ "node", "app" ]