package utils

import (
	"context"
	"fmt"
	"log"

	//"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func LogWithTrace(ctx context.Context, message string, args ...interface{}) {
	span, ok := tracer.SpanFromContext(ctx)
	formatted := fmt.Sprintf(message, args...) // renderiza bien el mensaje

	if ok {
		traceID := span.Context().TraceID()
		spanID := span.Context().SpanID()
		//log.Printf("dd.trace_id: %v dd.span_id: %v | %s", traceID, spanID, message)
		log.Printf("dd.trace_id: %v dd.span_id: %v | %s", traceID, spanID, formatted)

	} else {
		log.Printf("[no trace] | %s", formatted)
	}
}
