# Etapa del build
FROM golang:1.23 AS builder

WORKDIR /go/src/rpsweb

# Copiar solor los archivos de dependencia
COPY go.mod go.sum ./
RUN go mod download

# Copiar el resto
COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/rpsweb

# Imagen final
FROM debian:bullseye-slim

# Agrega esta línea para instalar certificados
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/rpsweb /app/rpsweb
COPY --from=builder /go/src/rpsweb/static /app/static
COPY --from=builder /go/src/rpsweb/templates /app/templates

# Copiar datadog-init
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init

EXPOSE 8080

# ENTRYPOINT ["/datadog-init"]
ENTRYPOINT ["/app/datadog-init"]
CMD ["/app/rpsweb"]
