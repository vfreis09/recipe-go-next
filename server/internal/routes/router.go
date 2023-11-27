package routes

import (
    "net/http"
    "github.com/labstack/echo/v4"
    "github.com/vfreis09/recipe-go-next/internal/models"
    "strconv"
)

func Home(c echo.Context) error {
    recipes, err := models.GetAllRecipes()

    if err != nil {
        return err
    } else {
        return c.JSON(http.StatusOK, recipes)    
    }
}

func GetRecipe(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))

    if err != nil {
        return c.String(http.StatusBadRequest, "Invalid ID")
    }

    recipe, err := models.GetRecipeByID(id) 

    if err != nil {
        return err
    } else {
        return c.JSON(http.StatusOK, recipe)    
    }}

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

func DelRecipe(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))

    if err != nil {
        return c.String(http.StatusBadRequest, "Invalid ID")
    }

    err = models.DeleteRecipe(id) 

    if err != nil {
        return err
    }
    
    return c.JSON(http.StatusCreated, "Recipe deleted")
}
