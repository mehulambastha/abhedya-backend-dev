FROM node:14

WORKDIR /abhedya-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
