FROM node:18-alpine

WORKDIR /app

COPY auth-service/package*.json ./auth-service/
COPY common/package*.json ./common/

RUN cd common && npm install
RUN cd auth-service && npm install

COPY common ./common
COPY auth-service ./auth-service

WORKDIR /app/auth-service

EXPOSE 5000

CMD ["npm", "start"]
