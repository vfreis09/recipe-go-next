import { useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header";
import Recipe from "@/components/Recipe";
import SearchInput from "@/components/Search";

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

interface RecipeData {
  recipes: Recipe;
  user: string;
}

//Fetch data from database
export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:4000/api/recipes");
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: RecipeData;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dataRecipes, setDataRecipes] = useState<Recipe[]>(data.recipes);
  console.log(data.user);
  const deleteRecipe = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        //Update state
        const updatedRecipes = dataRecipes.filter(
          (myRecipe) => myRecipe.id !== id
        );

        setDataRecipes(updatedRecipes);
      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  //Loop on the recipe api and send it to the recipe component as props
  const recipes = dataRecipes.map((recipe: Recipe) => {
    return <Recipe key={recipe.id} onDelete={deleteRecipe} {...recipe} />;
  });

  return (
    <div>
      <Header />
      <SearchInput />
      {recipes}
    </div>
  );
}
