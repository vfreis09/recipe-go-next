package models

import (
	"database/sql"
	"encoding/gob"
	"fmt"
	"log"
	"os"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

var Store *sessions.CookieStore

func Init() {
    err := godotenv.Load()

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    secretKey := os.Getenv("STORE_SECRET")

    Store = sessions.NewCookieStore([]byte(secretKey))

    Store.Options.HttpOnly = true
    gob.Register(&User{})
    
    connStr := os.Getenv("DB_STRING")

    db, err = sql.Open("postgres", connStr)

    if err != nil {
        log.Fatal(err)
    } else {
        fmt.Printf("DB is open\n")
    }
    
    query := `CREATE TABLE IF NOT EXISTS users(
        ID SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

        CREATE TABLE IF NOT EXISTS recipes(
        ID SERIAL PRIMARY KEY, 
        title VARCHAR(64) NOT NULL, 
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        categories VARCHAR(12) NOT NULL,
	username VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`

    _, err = db.Exec(query)

    if err != nil {
        log.Fatal(err)
    }
}    
