FROM node:18-alpine

WORKDIR /app

# Copy package files for both the service and common library
COPY favorite-service/package*.json ./favorite-service/
COPY common/package*.json ./common/

# Install dependencies for both
RUN cd common && npm install
RUN cd favorite-service && npm install

# Copy source code
COPY common ./common
COPY favorite-service ./favorite-service

WORKDIR /app/favorite-service

EXPOSE 5002

CMD ["npm", "start"]
