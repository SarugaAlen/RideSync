FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN GOOS=linux GOARCH=amd64 go build -o ride-service ./internal/main.go  # Update the path if necessary

FROM alpine:latest

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/ride-service .

RUN chmod +x ride-service

EXPOSE 8080

CMD ["./ride-service"]
