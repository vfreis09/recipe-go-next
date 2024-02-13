package routes

import (
	"net/http"
	"strconv"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/vfreis09/recipe-go-next/internal/models"
)

func Home(c echo.Context) error {
    recipes, err := models.GetAllRecipes()

    if err != nil {
        return err    
    }

    sess, err := session.Get("session", c)

    if err != nil {
        return err    
    }

    sessionData := sess.Values["user"]

    var user = &models.User{}
    if user, ok := sessionData.(*models.User); !ok {
        // Handle the case that it's not an expected type
        return err
    }
    response := map[string]interface{}{
        "recipes": recipes,
        "user": sessionData,
    }

    return c.JSON(http.StatusOK, response) 
}

func GetRecipe(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))

    if err != nil {
        return c.String(http.StatusBadRequest, "Invalid ID")
    }

    recipe, err := models.GetRecipeByID(id) 

    if err != nil {
        return err
    } 
    
    return c.JSON(http.StatusOK, recipe)    
}

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

func PostSignup(c echo.Context) error {
    user := new(models.UserSignup)

    if err := c.Bind(user); err != nil {
        return err
    }

    err := models.CreateUser(user)

    if err != nil {
        return err
    }
    
    return c.JSON(http.StatusCreated, "User created")
}

func PostLogin(c echo.Context) error {
    user := new(models.UserLogin)

    if err := c.Bind(user); err != nil {
        return err
    }

    err := models.LoginUser(user)

    if err != nil {
        return err
    }
    sess, _ := session.Get("session", c)
    sess.Options = &sessions.Options{
        Path: "/",
        MaxAge: 86400 * 7,
        HttpOnly: true,
    }
    sess.Values["user"] = user.Username
    err = sess.Save(c.Request(), c.Response())
    if err != nil {
        return err
    }

    return c.JSON(http.StatusOK, "User Logged In")
}

func GetLogout(c echo.Context) error {
    sess, _ := session.Get("session", c)

    // Clear the session data to log the user out
    sess.Values["user"] = nil

    err := sess.Save(c.Request(), c.Response())
    if err != nil {
        return err
    }

    return c.String(http.StatusOK, "Logged out successfully")
}
