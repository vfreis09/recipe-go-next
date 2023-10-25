package models

type Recipe struct {
    ID uint64 `json:"id"`
    Title string `json:"title"`
    Ingredients string `json:"ingredients"`
    Instructions string `json:"instructions"`
}

//Not working
func GetAllRecipes() ([]Recipe, error) {
    var recipes []Recipe
    
    query := `SELECT id, title, ingredients, instructions FROM recipes`

    rows, err := db.Query(query)

    if err != nil {
        return recipes, err
    }

    defer rows.Close() 

    for rows.Next() {
        var id uint64
        var title, ingredients, instructions string

        err := rows.Scan(&id, &title, &ingredients, &instructions)

        if err != nil {
            return recipes, err 
        }
        
        recipe := Recipe {
            ID: id,
            Title: title,
            Ingredients: ingredients,
            Instructions: instructions,
        }

        recipes = append(recipes, recipe)
    }

    return recipes, nil
}

//Not working too lole
func CreateRecipe(recipe *Recipe) error {
    query := `INSERT INTO recipes(title, ingredients, instructions) VALUES($1, $2, $3);`

    _, err := db.Exec(query, recipe.Title, recipe.Ingredients, recipe.Instructions)

    if err != nil {
        return err
    }

    return nil
}
