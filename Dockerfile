FROM node:alpine3.16

WORKDIR /usr/app

COPY . .
RUN npm install

CMD ["npm", "run", "docker-start"]