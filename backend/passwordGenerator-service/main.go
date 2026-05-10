package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/sethvargo/go-password/password"
)

func generatePassword(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, x-internal-secret")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Internal Security Check
	secret := r.Header.Get("x-internal-secret")
	// For simplicity, we compare with hardcoded or env var. 
	// In production, you'd use a proper env loader like godotenv.
	internalSecret := os.Getenv("INTERNAL_SECRET")
	if internalSecret == "" {
		internalSecret = "thwnjfiw12n3j4n089cjnn3nslpi34" // Fallback matching other services
	}

	if secret != internalSecret {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Forbidden - Direct access not allowed",
		})
		return
	}

	pass, err := password.Generate(12, 3, 2, false, false)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]string{
		"password": pass,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "5006"
	}

	http.HandleFunc("/api/tools/password", generatePassword)
	http.HandleFunc("/api/tools/password/", generatePassword)

	fmt.Printf("Password Generator running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
