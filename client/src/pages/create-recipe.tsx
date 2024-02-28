import { useState, ChangeEvent, FormEvent } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Recipe } from "@/types/types";
import styles from "../styles/Create.module.css";

const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    categories: "",
  });

  const updateRecipe = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const submitRecipe = async (e: FormEvent) => {
    e.preventDefault();

    if (
      recipe.title &&
      recipe.description &&
      recipe.ingredients &&
      recipe.instructions &&
      recipe.categories
    ) {
      try {
        const response = await fetch("http://localhost:4000/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
          // reset the form after a successful submission
          setRecipe({
            title: "",
            description: "",
            ingredients: "",
            instructions: "",
            categories: "",
          });
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <form onSubmit={submitRecipe}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className={styles.titleInput}
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              className={styles.textArea}
              id="description"
              name="description"
              value={recipe.description}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              className={styles.textArea}
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              className={styles.textArea}
              id="instructions"
              name="instructions"
              value={recipe.instructions}
              onChange={updateRecipe}
            />
          </div>
          <div>
            Category:
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="breakfast"
                onChange={updateRecipe}
              />
              Breakfast
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="appetizer"
                onChange={updateRecipe}
              />
              Appetizer
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="salad"
                onChange={updateRecipe}
              />
              Salad
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="main-course"
                onChange={updateRecipe}
              />
              Main-course
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="side-dish"
                onChange={updateRecipe}
              />
              Side-dish
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="baked-goods"
                onChange={updateRecipe}
              />
              Baked-goods
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="dessert"
                onChange={updateRecipe}
              />
              Dessert
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeForm;
