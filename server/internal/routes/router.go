package routes

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/vfreis09/recipe-go-next/internal/models"
)

func Home(c echo.Context) error {
    recipes, err := models.GetAllRecipes()

    if err != nil {
        return err
    } else {
        return c.JSON(http.StatusOK, recipes)    
    }
}
