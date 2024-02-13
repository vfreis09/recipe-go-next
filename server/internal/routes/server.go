package routes

import (
	"encoding/gob"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/vfreis09/recipe-go-next/internal/models"
)

type M map[string]interface{}

func Start() {
    //Setting up echo 
    e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	AllowOrigins: []string{"http://localhost:3000"},
	AllowCredentials: true,
    }))

    gob.Register(&models.User{})
    gob.Register(&M{})

    e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))

    //e.Use(middleware.Logger())

    //e.Use(middleware.Recover())
    
    e.GET("/api/recipes", Home)

    e.GET("/api/recipes/:id", GetRecipe)

    e.GET("/api/search", GetSearch)

    e.POST("/api/recipes", PostRecipe)

    e.PUT("/api/recipes/:id", UpdateHandler)

    e.DELETE("/api/recipes/:id", DelRecipe)

    e.POST("/api/signup", PostSignup)

    e.POST("api/login", PostLogin)

    e.GET("api/logout", GetLogout)

    e.Logger.Fatal(e.Start(":4000"))
}
