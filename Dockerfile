FROM node:20.12.2-alpine3.19

WORKDIR /usr/app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

RUN apk add --no-cache bash=5.2.21-r0

CMD ["npm", "start"]
