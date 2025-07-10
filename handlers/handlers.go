package handlers

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"rpsweb/rps"
	"rpsweb/utils"
	"strconv"

	"path"

	//"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

type Player struct {
	Name string
}

var player Player

func Index(w http.ResponseWriter, r *http.Request) {
	/*
		fmt.Fprintln(w, "Hola Mundo")
		tpl, err := template.ParseFiles("templates/base.html", "templates/index.html")
		if err != nil {
			http.Error(w, "Error al analizar la plantilla", http.StatusInternalServerError)
			return
		}
		data := struct {
			Title   string
			Message string
		}{
			Title:   "Paginas de Inicio",
			Message: "¡Bienvenido a Piedra, Papel o Tijera!",
		}


		err = tpl.ExecuteTemplate(w, "base", nil)
		if err != nil {
			http.Error(w, "Error al rederizar la plantilla", http.StatusInternalServerError)
			return
		}
	*/

	utils.LogWithTrace(r.Context(), "Página Index")

	restartValue()
	renderTemplate(w, "index.html", nil)
}

func NewGame(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintln(w, "Crear nuevo juego")
	utils.LogWithTrace(r.Context(), "Página de Nuevo Juego")
	restartValue()
	renderTemplate(w, "new-game.html", nil)
}

func Game(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintln(w, "Juego")
	if r.Method == "POST" {
		err := r.ParseForm()
		if err != nil {
			http.Error(w, "Error parsing form", http.StatusBadRequest)
			return
		}
		player.Name = r.Form.Get("name")
	}

	if player.Name == "" {
		http.Redirect(w, r, "/new", http.StatusFound)
	}

	utils.LogWithTrace(r.Context(), "Registrando usuario %s", player.Name)
	renderTemplate(w, "game.html", player)
}

func PlayCreateSpanManual(w http.ResponseWriter, r *http.Request) {
	playerChoice, _ := strconv.Atoi(r.URL.Query().Get("c"))
	result := rps.PlayRound(playerChoice)

	/*span, ok := tracer.SpanFromContext(r.Context())
	if !ok {
		log.Printf("Resultado: %v | sin trace_id", result)
	}

	traceID := span.Context().TraceID()
	spanID := span.Context().SpanID()
	log.Printf("Resultado: %v | dd.trace_id=%d | dd.span_id=%d | trace_id=%016x", result, traceID, spanID, traceID)
	//log.Printf("Resultado: %v | trace_id=%016x | span_id=%d", result, traceID, spanID)*/

	// Create a span for a web request at the /posts URL.
	span := tracer.StartSpan("web.request", tracer.ResourceName("/play"))
	defer span.Finish()

	// Append span info to log messages:
	log.Printf("my log message %v", span)

	out, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

func About(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintln(w, "Acerca de")
	utils.LogWithTrace(r.Context(), "Página de Acerca de")
	restartValue()
	renderTemplate(w, "about.html", nil)
}

func Play(w http.ResponseWriter, r *http.Request) {

	playerChoice, _ := strconv.Atoi(r.URL.Query().Get("c"))
	result := rps.PlayRound(playerChoice)

	log.Printf("🕹️ Solicitud /play recibida con c=%s", r.URL.Query().Get("c"))
	utils.LogWithTrace(r.Context(), "🕹️ Solicitud /play recibida con c=%s", r.URL.Query().Get("c"))

	out, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Println(err)
		return
	}

	utils.LogWithTrace(r.Context(), "✅ Resultado enviado a cliente: %+v", result)
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

func renderTemplate(w http.ResponseWriter, page string, data any) {
	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	exPath := filepath.Dir(ex)
	templateDir := path.Join(exPath, "templates/")
	templateBase := path.Join(templateDir, "base.html")

	tpl := template.Must(template.ParseFiles(templateBase, path.Join(templateDir, page)))
	err = tpl.ExecuteTemplate(w, "base", data)
	if err != nil {
		http.Error(w, "Error al rederizar la plantilla", http.StatusInternalServerError)
		log.Println(err)
		return
	}
}

func restartValue() {
	player.Name = ""
	rps.ComputerScore = 0
	rps.PlayerScore = 0
}
