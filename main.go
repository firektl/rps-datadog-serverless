package main

import (
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"rpsweb/handlers"

	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	//"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
	"gopkg.in/DataDog/dd-trace-go.v1/profiler"
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

	err := profiler.Start(
		profiler.WithService(os.Getenv("DD_SERVICE")),
		profiler.WithEnv(os.Getenv("DD_ENV")),
		profiler.WithProfileTypes(
			profiler.CPUProfile,
			profiler.HeapProfile,
		),
	)

	if err != nil {
		log.Fatal(err)
	}
	defer profiler.Stop()

	router := httptrace.NewServeMux(
		httptrace.WithServiceName("rpsweb"),
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
	//port := ":8080"

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	port = ":" + port

	log.Printf("Servidor escuchando en http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}
