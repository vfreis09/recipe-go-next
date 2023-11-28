package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Start() {
    //Setting up echo 
    e := echo.New()

    e.Use(middleware.CORS())
    
    e.GET("/api/recipes", Home)

    e.GET("/api/recipes/:id", GetRecipe)

    e.POST("/api/recipes", PostRecipe)

    e.PUT("/api/recipes/:id", UpdateHandler)

    e.DELETE("/api/recipes/:id", DelRecipe)

    e.Logger.Fatal(e.Start(":4000"))
}
