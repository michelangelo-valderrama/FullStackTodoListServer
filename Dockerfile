FROM node:20
RUN apt update -y
COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install
CMD npm run start:dev
