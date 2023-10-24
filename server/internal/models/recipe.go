package models

type Recipe struct {
    ID uint64 `json:"id"`
    Title string `json:"title"`
    Ingredients string `json:"ingredients"`
    Description string `json:"description"`
}

//Not working
func GetAllRecipes() ([]Recipe, error) {
    var recipes []Recipe
    
    query := `SELECT id, title, ingredients, description FROM recipes`

    rows, err := db.Query(query)

    if err != nil {
        return recipes, err
    }

    defer rows.Close() 

    for rows.Next() {
        var id uint64
        var title, ingredients, description string

        err := rows.Scan(&id, &title, &ingredients, &description)

        if err != nil {
            return recipes, err 
        }
        
        recipe := Recipe {
            ID: id,
            Title: title,
            Ingredients: ingredients,
            Description: description,
        }

        recipes = append(recipes, recipe)
    }

    return recipes, nil
}

//Not working too lole
func CreateRecipe(recipe *Recipe) error {
    query := `INSERT INTO recipes(title, ingredients, description) VALUES($1, $2, $3);`

    _, err := db.Exec(query, recipe.Title, recipe.Ingredients, recipe.Description)

    if err != nil {
        return err
    }

    return nil
}
