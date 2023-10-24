package main

import (
    "github.com/vfreis09/recipe-go-next/internal/models"
    "github.com/vfreis09/recipe-go-next/internal/routes"
)

func main() {
    models.Init()
    routes.Start()
}
