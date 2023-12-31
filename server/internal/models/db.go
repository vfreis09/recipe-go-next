package models

import (
    "fmt"
    "log"
    "os"
    "github.com/joho/godotenv"
    "database/sql"
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
        ID SERIAL UNIQUE NOT NULL, 
        title VARCHAR(64) NOT NULL, 
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        image BYTEA,
        PRIMARY KEY (ID));`

    _, err = db.Exec(query)

    if err != nil {
        log.Fatal(err)
    }
}    
