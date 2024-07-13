FROM node:22.4.1-alpine

WORKDIR /usr/src/app

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "run start"]