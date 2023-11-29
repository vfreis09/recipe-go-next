package models

type Recipe struct {
    ID int `json:"id"`
    Title string `json:"title"`
    Ingredients string `json:"ingredients"`
    Instructions string `json:"instructions"`
    Image string `json:"image"`
}

func GetAllRecipes() ([]Recipe, error) {
    var recipes []Recipe
    
    query := `SELECT id, title, ingredients, instructions, image FROM recipes`

    rows, err := db.Query(query)

    if err != nil {
        return recipes, err
    }

    defer rows.Close() 

    for rows.Next() {
        var id int
        var title, ingredients, instructions, image string

        err := rows.Scan(&id, &title, &ingredients, &instructions, &image)

        if err != nil {
            return recipes, err 
        }
        
        recipe := Recipe {
            ID: id,
            Title: title,
            Ingredients: ingredients,
            Instructions: instructions,
            Image: image,
        }

        recipes = append(recipes, recipe)
    }

    return recipes, nil
}

func GetRecipeByID(id int) (Recipe, error) {
    var recipe Recipe 

    query := `SELECT title, ingredients, instructions, image FROM recipes WHERE id=$1;`

    row, err := db.Query(query, id)

    if err != nil {
        return recipe, err
    }

    defer row.Close()

    if row.Next() {
        var title, ingredients, instructions, image string

        err := row.Scan(&title, &ingredients, &instructions, &image)
        if err != nil {
            return recipe, err
        }

        recipe = Recipe {
            ID: id,
            Title: title,
            Ingredients: ingredients,
            Instructions: instructions,
            Image: image,
        }
    }

    return recipe, nil
}

func CreateRecipe(recipe *Recipe) error {
    query := `INSERT INTO recipes(title, ingredients, instructions, image) VALUES($1, $2, $3, $4);`

    _, err := db.Exec(query, recipe.Title, recipe.Ingredients, recipe.Instructions, recipe.Image)

    if err != nil {
        return err
    }

    return nil
}

func UpdateRecipe (recipe Recipe, id int) error {
    query := `UPDATE recipes SET title=$1, ingredients=$2, instructions=$3, image=$4 WHERE id=$5`

    _, err := db.Exec(query, recipe.Title, recipe.Ingredients, recipe.Instructions, recipe.Image, id)
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
