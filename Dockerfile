FROM node:16-alpine

WORKDIR /dc-rice/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build

EXPOSE 9000

CMD [ "npm","start" ]
