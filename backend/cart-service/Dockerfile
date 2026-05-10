FROM node:18-alpine

WORKDIR /app

# Copy package files for both the service and common library
COPY cart-service/package*.json ./cart-service/
COPY common/package*.json ./common/

# Install dependencies for both
RUN cd common && npm install
RUN cd cart-service && npm install

# Copy source code
COPY common ./common
COPY cart-service ./cart-service

WORKDIR /app/cart-service

EXPOSE 5003

CMD ["npm", "start"]
