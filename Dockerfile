FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

RUN apk add --no-cache bash

CMD ["npm", "start"]
