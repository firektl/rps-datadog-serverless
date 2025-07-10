# Etapa del build
FROM golang:1.23 AS builder

WORKDIR /go/src/rpsweb

# Copiar solor los archivos de dependencia
COPY go.mod go.sum ./
RUN go mod download

# Copiar el resto
COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /app/rpsweb

# Imagen final con Datadog serverless-init
FROM gcr.io/datadoghq/serverless-init:latest

WORKDIR /app
COPY --from=builder /app/rpsweb /app/rpsweb
COPY --from=builder /go/src/rpsweb/static /app/static
COPY --from=builder /go/src/rpsweb/templates /app/templates

EXPOSE 8080

ENTRYPOINT ["/datadog-init"]
CMD ["/app/rpsweb"]
