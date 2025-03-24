FROM golang:1.24-alpine AS builder

RUN apk add --no-cache gcc musl-dev

WORKDIR /app
COPY . .

RUN go build -o ride-service ./internal/main.go

FROM alpine:latest
WORKDIR /app

COPY --from=builder /app/ride-service .

COPY rides.db .

EXPOSE 8080

CMD ["./ride-service"]
