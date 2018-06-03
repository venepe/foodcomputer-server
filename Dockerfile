FROM node:8.9.4

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./.babelrc ./
RUN npm install
EXPOSE 8002
CMD npm start
