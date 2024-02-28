package models

type Recipe struct {
    ID int `json:"id"`
    Title string `json:"title"`
    Description string `json:"description"`
    Ingredients string `json:"ingredients"`
    Instructions string `json:"instructions"`
    Categories string `json:"categories"`
}

func GetAllRecipes() ([]Recipe, error) {
    var recipes []Recipe
    
    query := `SELECT id, title, description, ingredients, instructions, categories FROM recipes`

    rows, err := db.Query(query)

    if err != nil {
        return recipes, err
    }

    defer rows.Close() 

    for rows.Next() {
        var id int
        var title, description, ingredients, instructions, categories string

        err := rows.Scan(&id, &title, &description, &ingredients, &instructions, &categories)

        if err != nil {
            return recipes, err 
        }
        
        recipe := Recipe {
            ID: id,
            Title: title,
            Description: description,
            Ingredients: ingredients,
            Instructions: instructions,
            Categories: categories,
        }

        recipes = append(recipes, recipe)
    }

    return recipes, nil
}

func GetRecipeByID(id int) (Recipe, error) {
    var recipe Recipe 

    query := `SELECT title, description, ingredients, instructions, categories FROM recipes WHERE id=$1;`

    row, err := db.Query(query, id)

    if err != nil {
        return recipe, err
    }

    defer row.Close()

    if row.Next() {
        var title, description, ingredients, instructions, categories string

        err := row.Scan(&title, &description, &ingredients, &instructions, &categories)
        if err != nil {
            return recipe, err
        }

        recipe = Recipe {
            ID: id,
            Title: title,
            Description: description,
            Ingredients: ingredients,
            Instructions: instructions,
            Categories: categories,
        }
    }

    return recipe, nil
}

func GetQuerySearch(search string) ([]Recipe, error) {
    var recipes []Recipe
    
    query := `SELECT id, title, description, ingredients, instructions, categories FROM recipes
        WHERE 
        title ILIKE '%' || $1 || '%' OR
        description ILIKE '%' || $1 || '%' OR
        ingredients ILIKE '%' || $1 || '%' OR 
        instructions ILIKE '%' || $1 || '%' OR 
        categories ILIKE '%' || $1 || '%'`

    rows, err := db.Query(query, search)

    if err != nil {
        return recipes, err
    }

    defer rows.Close()

    for rows.Next() {
        var id int
        var title, description, ingredients, instructions, categories string

        err := rows.Scan(&id, &title, &description, &ingredients, &instructions, &categories)

        if err != nil {
            return recipes, err 
        }
        
        recipe := Recipe {
            ID: id,
            Title: title,
            Description: description,
            Ingredients: ingredients,
            Instructions: instructions,
            Categories: categories,
        }

        recipes = append(recipes, recipe)
    }

    return recipes, nil
}

func CreateRecipe(recipe *Recipe) error {
    query := `INSERT INTO recipes(title, description, ingredients, instructions, categories) VALUES($1, $2, $3, $4, $5);`

    _, err := db.Exec(query, recipe.Title, recipe.Description, recipe.Ingredients, recipe.Instructions, recipe.Categories)

    if err != nil {
        return err
    }

    return nil
}

func UpdateRecipe (recipe Recipe, id int) error {
    query := `UPDATE recipes SET title=$1, description=$2, ingredients=$3, instructions=$4, categories=$5, updated_at = NOW() WHERE id=$6`

    _, err := db.Exec(query, recipe.Title, recipe.Description, recipe.Ingredients, recipe.Instructions, recipe.Categories, id)
    if err != nil {
        return err
    }
    return nil
}

func DeleteRecipe(id int) error {
    query := `DELETE FROM recipes WHERE id=$1;`

    _, err := db.Exec(query, id)

    if err != nil {
        return err
    }
    return nil
}
