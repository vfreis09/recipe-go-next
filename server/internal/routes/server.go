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

    e.Logger.Fatal(e.Start(":4000"))
}
