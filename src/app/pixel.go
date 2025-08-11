package handler

import (
	"fmt"
	"net/http"
)

// Handler is the Vercel-compatible function for our pixel endpoint.
func Handler(w http.ResponseWriter, r *http.Request) {
	// The request for the pixel is our page view event.
	userAgent := r.Header.Get("User-Agent")
	ipAddress := r.Header.Get("X-Forwarded-For")
	pageURL := r.URL.Query().Get("url")

	// Log the event data. In production, you'd store this in a database.
	fmt.Printf("Received page view event from IP: %s\n", ipAddress)
	fmt.Printf("User Agent: %s\n", userAgent)
	fmt.Printf("Page URL: %s\n", pageURL)

	// Send back a 1x1 transparent GIF.
	w.Header().Set("Content-Type", "image/gif")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")

	// Raw bytes of a 1x1 transparent GIF
	gifData := []byte{
		0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
		0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
		0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
		0x02, 0x44, 0x01, 0x00, 0x3b,
	}
	w.Write(gifData)
}