FROM node:18-alpine

WORKDIR /app

# Copy package files for both the service and common library
COPY notifications-service/package*.json ./notifications-service/
COPY common/package*.json ./common/

# Install dependencies for both
RUN cd common && npm install
RUN cd notifications-service && npm install

# Copy source code
COPY common ./common
COPY notifications-service ./notifications-service

WORKDIR /app/notifications-service

EXPOSE 5005

CMD ["npm", "start"]
