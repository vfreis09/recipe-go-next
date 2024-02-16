import { useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header";
import Recipe from "@/components/Recipe";
import SearchInput from "@/components/Search";

interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

// Fetch data from database
export const getServerSideProps = (async () => {
  try {
    const res = await fetch("http://localhost:4000/api/recipes");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: [] } }; // Return an empty array if fetching fails
  }
}) as GetServerSideProps<{ data: RecipeData[] }>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dataRecipes, setDataRecipes] = useState<RecipeData[]>(data || []);

  const deleteRecipe = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "DELETE",
      });

      //Update state
      const updatedRecipes = dataRecipes.filter(
        (myRecipe) => myRecipe.id !== id
      );

      setDataRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  //Loop on the recipe api and send it to the recipe component as props
  const recipes = dataRecipes.map((recipe: RecipeData) => {
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
