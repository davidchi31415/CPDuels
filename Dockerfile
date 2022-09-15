FROM node:alpine

WORKDIR /usr/app

COPY . .
RUN npm install
RUN npm install serve --s

CMD ["npm", "start"]