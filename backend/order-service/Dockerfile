FROM node:18-alpine

WORKDIR /app

# Copy package files for both the service and common library
COPY order-service/package*.json ./order-service/
COPY common/package*.json ./common/

# Install dependencies for both
RUN cd common && npm install
RUN cd order-service && npm install

# Copy source code
COPY common ./common
COPY order-service ./order-service

WORKDIR /app/order-service

EXPOSE 5004

CMD ["npm", "start"]
