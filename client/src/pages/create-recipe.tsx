import React, { useState, ChangeEvent, FormEvent } from "react";
import Header from "@/components/Header";

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
}

const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
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
  console.log(recipe);
  const submitRecipe = async (e: FormEvent) => {
    e.preventDefault();

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
          ingredients: "",
          instructions: "",
          image: "",
        });
      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitRecipe}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipe.title}
            onChange={updateRecipe}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={updateRecipe}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={updateRecipe}
          />
        </div>
        <div>
          <input
            type="file"
            id="image"
            name="image"
            value={recipe.image}
            onChange={updateRecipe}
            accept="image/*"
          />
        </div>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
