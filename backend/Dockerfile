FROM node:18

WORKDIR /app/gohere/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]