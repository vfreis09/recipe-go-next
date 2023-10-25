//import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface RecipeData {
  title: string;
  ingredients: string;
  instructions: string;
}

const RecipeForm: React.FC = () => {
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: "",
    ingredients: "",
    instructions: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
        // You can also reset the form or perform other actions after a successful submission
        setRecipeData({
          title: "",
          ingredients: "",
          instructions: "",
        });
      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={recipeData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipeData.ingredients}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipeData.instructions}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;

/* export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:4000/api/recipes");
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: RecipeData;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <h1>{data.name}</h1>;
} */
