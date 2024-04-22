FROM node:20.12.2-alpine3.19

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

RUN apk add --no-cache bash

CMD ["npm", "start"]
