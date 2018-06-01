FROM node:8.9.4

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./.babelrc ./
RUN npm install
ENV PORT=80
EXPOSE 80
CMD npm start
