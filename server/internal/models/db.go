package models

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func Init() {
    err := godotenv.Load()

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    connStr := os.Getenv("DB_STRING")

    db, err = sql.Open("postgres", connStr)

    if err != nil {
        log.Fatal(err)
    } else {
        fmt.Printf("DB is open\n")
    }
    
    query := `CREATE TABLE IF NOT EXISTS recipes(
        ID SERIAL PRIMARY KEY, 
        title VARCHAR(64) NOT NULL, 
	description TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        categories VARCHAR(12) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`

    _, err = db.Exec(query)

    if err != nil {
        log.Fatal(err)
    }
}    
