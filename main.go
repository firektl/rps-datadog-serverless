package main

import (
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"rpsweb/handlers"

	httptrace "github.com/DataDog/dd-trace-go/contrib/net/http/v2" //  "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"

	tracer "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
	log.SetOutput(os.Stdout)
	log.Println("🚀 Iniciando rpsweb…")

	tracer.Start(
		tracer.WithService(os.Getenv("DD_SERVICE")), //tracer.WithService("rpsweb"),
		tracer.WithEnv(os.Getenv("DD_ENV")),         //tracer.WithEnv("lab"),
		tracer.WithRuntimeMetrics(),
	)
	defer tracer.Stop()

	router := httptrace.NewServeMux(
	/*httptrace.WithServiceName("rpsweb"),*/
	)

	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	exPath := filepath.Dir(ex)

	fs := http.FileServer(http.Dir(path.Join(exPath, "static")))
	router.Handle("/static/", http.StripPrefix("/static/", fs))
	router.HandleFunc("/", handlers.Index)
	router.HandleFunc("/new", handlers.NewGame)
	router.HandleFunc("/game", handlers.Game)
	router.HandleFunc("/play", handlers.Play)
	router.HandleFunc("/about", handlers.About)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	port = ":" + port

	wrapped := httptrace.WrapHandler(router, "rpsweb", "router")

	log.Printf("Servidor escuchando en http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, wrapped))
}
