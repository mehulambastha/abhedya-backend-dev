FROM node:20

COPY package*.json ./

WORKDIR /frontend/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm start