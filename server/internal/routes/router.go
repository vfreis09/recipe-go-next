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

func PostRecipe(c echo.Context) error {
    recipe := new(models.Recipe) 

    if err := c.Bind(recipe); err != nil {
        return err
    }

    err := models.CreateRecipe(recipe)

    if err != nil {
        return err
    }
    
    return c.JSON(http.StatusCreated, recipe)
}
