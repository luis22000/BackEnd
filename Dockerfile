FROM node:10

ARG PROD=production

ENV NODE_ENV ${PROD}

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]