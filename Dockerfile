FROM node:alpine3.16

WORKDIR /usr/app

COPY . .
RUN npm install
RUN export NODE_OPTIONS=--max_old_space_size=4096

CMD ["npm", "run", "build"]