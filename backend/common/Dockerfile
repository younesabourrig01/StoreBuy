FROM node:18-alpine

WORKDIR /app/common

COPY package*.json ./
RUN npm install

COPY . .

# This is a shared library, not a runnable service.
# This Dockerfile can be used to build a base image or run tests.
CMD ["echo", "Common library container"]
