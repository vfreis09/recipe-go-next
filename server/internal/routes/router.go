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

func GetSearch(c echo.Context) error {
    search := c.QueryParam("q")

    recipes, err := models.GetQuerySearch(search)

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

func UpdateHandler(c echo.Context) error {
    var recipe models.Recipe
    if err := c.Bind(&recipe); err != nil {
        return err
    }

    id, err := strconv.Atoi(c.Param("id"))

    if err != nil {
        return c.String(http.StatusBadRequest, "Invalid ID")
    }
    err = models.UpdateRecipe(recipe, id)
    if err != nil {
        return err
    }
    return c.JSON(http.StatusOK, "Status OK")
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

func Auth(c echo.Context) error {
    session, _ := models.Store.Get(c.Request(), "session")

    session.Values["authenticated"] = true

    session.Save(c.Request(), c.Response())

    return nil
}

func PostSignup(c echo.Context) error {
    user := new(models.User)

    if err := c.Bind(user); err != nil {
        return err
    }

    err := models.CreateUser(user)

    if err != nil {
        return err
    }
    
    return c.JSON(http.StatusCreated, user)
}

func PostLogin(c echo.Context) error {
    user := new(models.UserLogin)

    if err := c.Bind(user); err != nil {
        return err
    }

    err := models.LoginUser(user)

    if err == nil {
        session, _ := models.Store.Get(c.Request(), "session")
        session.Values["user"] = user
        session.Save(c.Request(), c.Response())
    }

    if err != nil {
        return err
    }
    return c.JSON(http.StatusOK, "User Logged In")
}

func PostLogout(c echo.Context) error {
    return nil
}
