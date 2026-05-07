# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum from the service directory
COPY passwordGenerator-service/go.mod passwordGenerator-service/go.sum ./
RUN go mod download

# Copy the source code
COPY passwordGenerator-service/ .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final stage
FROM alpine:latest

WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

EXPOSE 5005

CMD ["./main"]
