FROM node:18-alpine

WORKDIR /app

# Copy package files for both the service and common library
COPY product-service/package*.json ./product-service/
COPY common/package*.json ./common/

# Install dependencies for both
RUN cd common && npm install
RUN cd product-service && npm install

# Copy source code
COPY common ./common
COPY product-service ./product-service

WORKDIR /app/product-service

EXPOSE 5001

CMD ["npm", "start"]
