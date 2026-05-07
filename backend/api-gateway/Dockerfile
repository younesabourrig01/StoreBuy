FROM node:18-alpine

WORKDIR /app

COPY api-gateway/package*.json ./api-gateway/

RUN cd api-gateway && npm install

COPY api-gateway ./api-gateway

WORKDIR /app/api-gateway

EXPOSE 4000

CMD ["npm", "start"]
